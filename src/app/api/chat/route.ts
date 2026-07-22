import { NextRequest, NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import { FAQ_DATABASE, DEFAULT_RESPONSE, FAQItem } from '@/data/faq-database';
import { saveUnansweredQuestion } from '@/lib/mongodb';

// Initialize Fuse.js for fuzzy search fallback
const fuse = new Fuse(FAQ_DATABASE, {
    keys: ['keywords', 'question', 'answer'],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
});

// Common spelling corrections for the fallback engine
const spellingCorrections: { [key: string]: string } = {
    'servises': 'services',
    'wbesite': 'website',
    'websit': 'website',
    'webiste': 'website',
    'aplication': 'application',
    'app': 'application',
    'pice': 'price',
    'prce': 'price',
    'prise': 'price',
    'prcing': 'pricing',
    'cots': 'cost',
    'coust': 'cost',
    'devlopment': 'development',
    'develoment': 'development',
    'developemnt': 'development',
    'marketng': 'marketing',
    'markting': 'marketing',
    'desgin': 'design',
    'desgn': 'design',
    'mobil': 'mobile',
    'moble': 'mobile',
    'andriod': 'android',
    'stichbyte': 'stitchbyte',
    'sticthbyte': 'stitchbyte',
    'stitchbite': 'stitchbyte',
    'stich': 'stitch',
    'sb': 'stitchbyte',
    'helllo': 'hello',
    'helo': 'hello',
    'hii': 'hi',
    'thanku': 'thanks',
    'thnks': 'thanks',
    'plz': 'please',
    'pls': 'please',
    'lalsweets': 'lal sweets',
    'lalsweet': 'lal sweets',
    'laalsweets': 'lal sweets',
    'kirtilal': 'kirtilals',
    'tradescrib': 'tradescribe',
    'murzaban': 'murzban',
    'porfolio': 'portfolio',
    'portfoilo': 'portfolio',
    'casestudy': 'case studies',
    'casestudies': 'case studies'
};

function correctSpelling(text: string): string {
    let corrected = text.toLowerCase();
    for (const [wrong, right] of Object.entries(spellingCorrections)) {
        corrected = corrected.replace(new RegExp(`\\b${wrong}\\b`, 'gi'), right);
    }
    return corrected;
}

function findBestLocalMatch(input: string): { answer: string; confidence: number } {
    const correctedInput = correctSpelling(input);
    const lowerInput = correctedInput.toLowerCase().trim();

    // Try keyword matching first
    const sortedFAQs = [...FAQ_DATABASE].sort((a, b) => (b.priority || 0) - (a.priority || 0));
    let bestMatch: FAQItem | null = null;
    let highestScore = 0;

    for (const faq of sortedFAQs) {
        let score = 0;
        for (const keyword of faq.keywords) {
            const keywordLower = keyword.toLowerCase();
            if (lowerInput === keywordLower) {
                score += keyword.length * 12;
            } else if (lowerInput.includes(keywordLower)) {
                score += keyword.length * 2.5;
            }
        }
        if (faq.priority) score += faq.priority * 0.1;

        if (score > highestScore) {
            highestScore = score;
            bestMatch = faq;
        }
    }

    if (bestMatch && highestScore >= 4) {
        return { answer: bestMatch.answer, confidence: Math.min(highestScore / 10, 1) };
    }

    // Try fuzzy search
    const fuseResults = fuse.search(correctedInput);
    if (fuseResults.length > 0 && fuseResults[0].score !== undefined) {
        const bestFuseMatch = fuseResults[0];
        const confidence = 1 - (bestFuseMatch.score || 0);
        if (confidence > 0.55) {
            return { answer: bestFuseMatch.item.answer, confidence };
        }
    }

    return { answer: DEFAULT_RESPONSE, confidence: 0 };
}

// Function to call Gemini API
async function getGeminiResponse(message: string, apiKey: string): Promise<string> {
    const faqContext = FAQ_DATABASE.map(item => `Q: ${item.question}\nA: ${item.answer}`).join("\n\n");
    
    const systemPrompt = `You are StitchBot 🤖, the official, highly smart, and funky AI assistant for StitchByte (often called "Stitch" or "sb"). 
StitchByte is a leading web development, SEO, and UI/UX design agency based in the Alwar, Rajasthan (Delhi NCR), serving ambitious brands globally.

Your personality:
- Extremely funky, energetic, friendly, and cool! Use modern tech slang, emojis, and playful expressions (e.g. "Yo!", "Beep boop", "boom!", "that's how we roll", "wizard", "pure fire", "absolute masterpiece").
- Sharp, smart, and direct. Do not be boring, dry, or formal.
- Feel free to mention our location in Alwar, Rajasthan (Delhi NCR) if asked about where we operate from.
- If you don't know the answer or if it's a specific custom request (like custom software specs, hiring developers, custom quote meetings), politely and funnily suggest they leave their contact details so our human wizards can connect.

Contextual Knowledge:
Here is the official StitchByte database to guide your answers:
${faqContext}

Rules:
1. Answer any question about StitchByte using this context.
2. If the user asks about the founders/team, mention Mayur Bhargava (CEO & Founder, code mastermind), Dhruv (Co-founder & AI/ML Specialist), and Mayank (Designing Head).
3. If they write "Stitch" or "sb" instead of "StitchByte", answer it as StitchByte.
4. If they ask about Case Studies or projects we've built, tell them about Lal Sweets (Ecom), Kirtilals (Luxury Jewelry), Tradescribe (Trading Journal Platform), and Murzban (Luxury Clothing). Highlight our performance outcomes and tech stacks!
5. Keep answers readable, structured, and use bold text, lists, or custom bullet points where appropriate.
6. If the question is completely unrelated to StitchByte, digital design, or tech, guide them back to StitchByte services in a funky way.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600
            }
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || DEFAULT_RESPONSE;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, userInfo } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        let answer = "";
        let confidence = 1;
        let isAi = false;

        if (apiKey) {
            try {
                answer = await getGeminiResponse(message, apiKey);
                isAi = true;
            } catch (aiError) {
                console.error("Gemini failed, falling back to local search:", aiError);
            }
        }

        // Fallback if no API key or if Gemini call fails
        if (!answer) {
            const localResult = findBestLocalMatch(message);
            answer = localResult.answer;
            confidence = localResult.confidence;
        }

        // Determine if we need human follow-up contact info
        const contactKeywords = ["contact", "email", "phone", "call", "hire", "pricing", "price", "cost", "quote", "meeting", "consultation", "started", "callback", "whatsapp"];
        const lowerMsg = message.toLowerCase();
        const needsFollowUp = (!isAi && confidence < 0.3) || contactKeywords.some(keyword => lowerMsg.includes(keyword));

        // Save unanswered questions in DB if follow-up is needed and info is provided
        if (needsFollowUp && userInfo?.name && userInfo?.email) {
            try {
                await saveUnansweredQuestion({
                    question: message,
                    timestamp: new Date(),
                    userInfo: userInfo
                });
            } catch (dbError) {
                console.error('Failed to save lead info:', dbError);
            }
        }

        return NextResponse.json({
            answer,
            confidence,
            needsFollowUp
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
