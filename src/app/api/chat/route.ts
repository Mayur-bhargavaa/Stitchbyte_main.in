import { NextRequest, NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import { FAQ_DATABASE, DEFAULT_RESPONSE, FAQItem } from '@/data/faq-database';
import { saveUnansweredQuestion } from '@/lib/mongodb';

// Initialize Fuse.js for fuzzy search
const fuse = new Fuse(FAQ_DATABASE, {
    keys: ['keywords', 'question'],
    threshold: 0.4, // Lower = stricter matching
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
});

// Common spelling corrections
const spellingCorrections: { [key: string]: string } = {
    'servises': 'services',
    'wbesite': 'website',
    'websit': 'website',
    'webiste': 'website',
    'app': 'app',
    'aplication': 'application',
    'pice': 'price',
    'prce': 'price',
    'prise': 'price',
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
    'androd': 'android',
    'directer': 'director',
    'directar': 'director',
    'foundar': 'founder',
    'foundor': 'founder',
    'serives': 'services',
    'servces': 'services',
    'timleine': 'timeline',
    'timline': 'timeline',
    'tecnology': 'technology',
    'technolgy': 'technology',
    'suport': 'support',
    'supprt': 'support',
    'maintanance': 'maintenance',
    'maintenace': 'maintenance',
    'stichbyte': 'stitchbyte',
    'sticthbyte': 'stitchbyte',
    'stitchbite': 'stitchbyte',
    'whatsap': 'whatsapp',
    'whatapp': 'whatsapp',
    'emal': 'email',
    'emil': 'email',
    'contct': 'contact',
    'contac': 'contact',
    'helllo': 'hello',
    'helo': 'hello',
    'hii': 'hi',
    'thanku': 'thanks',
    'thnks': 'thanks',
    'plz': 'please',
    'pls': 'please',
    'u': 'you',
    'ur': 'your',
    'hw': 'how',
    'wht': 'what',
    'wat': 'what',
    'wen': 'when',
    'wer': 'where',
    'y': 'why',
};

function correctSpelling(text: string): string {
    let corrected = text.toLowerCase();
    for (const [wrong, right] of Object.entries(spellingCorrections)) {
        corrected = corrected.replace(new RegExp(`\\b${wrong}\\b`, 'gi'), right);
    }
    return corrected;
}

// Check if input is likely gibberish (no real words)
function isGibberish(text: string): boolean {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 1);
    if (words.length === 0) return true;

    const commonWords = new Set([
        'hi', 'hello', 'hey', 'what', 'how', 'who', 'where', 'when', 'why',
        'is', 'are', 'do', 'does', 'can', 'could', 'will', 'would',
        'the', 'a', 'an', 'and', 'or', 'but', 'for', 'to', 'of', 'in', 'on',
        'your', 'you', 'my', 'me', 'i', 'we', 'they', 'it', 'this', 'that',
        'website', 'app', 'mobile', 'price', 'cost', 'service', 'services',
        'design', 'development', 'marketing', 'seo', 'social', 'media',
        'contact', 'email', 'phone', 'help', 'support', 'time', 'timeline',
        'stitchbyte', 'director', 'founder', 'ceo', 'owner', 'name', 'about',
        'products', 'tools', 'work', 'working', 'process', 'thanks', 'bye',
        'need', 'want', 'looking', 'know', 'tell', 'get', 'start', 'build'
    ]);

    const hasRealWord = words.some(word => {
        if (commonWords.has(word)) return true;
        if (spellingCorrections[word]) return true;
        return false;
    });

    return !hasRealWord;
}

function findBestMatchWithFuzzy(input: string): { answer: string; confidence: number } {
    // Check for gibberish first
    if (isGibberish(input)) {
        return { answer: DEFAULT_RESPONSE, confidence: 0 };
    }

    const correctedInput = correctSpelling(input);

    // First try exact keyword matching
    const lowerInput = correctedInput.toLowerCase().trim();

    // Sort by priority
    const sortedFAQs = [...FAQ_DATABASE].sort((a, b) => (b.priority || 0) - (a.priority || 0));

    let bestMatch: FAQItem | null = null;
    let highestScore = 0;

    for (const faq of sortedFAQs) {
        let score = 0;
        for (const keyword of faq.keywords) {
            const keywordLower = keyword.toLowerCase();
            if (lowerInput === keywordLower) {
                score += keyword.length * 10;
            } else if (lowerInput.includes(keywordLower)) {
                score += keyword.length * 2;
            } else if (keyword.includes(' ')) {
                const keywordWords = keywordLower.split(' ');
                if (keywordWords.every(word => lowerInput.includes(word))) {
                    score += keyword.length;
                }
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

    // Fall back to fuzzy search
    const fuseResults = fuse.search(correctedInput);

    if (fuseResults.length > 0 && fuseResults[0].score !== undefined) {
        const bestFuseMatch = fuseResults[0];
        const confidence = 1 - (bestFuseMatch.score || 0);

        if (confidence > 0.5) {
            return { answer: bestFuseMatch.item.answer, confidence };
        }
    }

    return { answer: DEFAULT_RESPONSE, confidence: 0 };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, userInfo } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const { answer, confidence } = findBestMatchWithFuzzy(message);

        // If confidence is low and answer is default, save to MongoDB only if userInfo is provided
        if (confidence < 0.3 && answer === DEFAULT_RESPONSE && userInfo?.name && userInfo?.email) {
            try {
                await saveUnansweredQuestion({
                    question: message,
                    timestamp: new Date(),
                    userInfo: userInfo
                });
            } catch (dbError) {
                console.error('Failed to save unanswered question:', dbError);
            }
        }

        return NextResponse.json({
            answer,
            confidence,
            needsFollowUp: confidence < 0.3
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
