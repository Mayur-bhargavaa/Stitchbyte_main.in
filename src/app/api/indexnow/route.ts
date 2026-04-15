import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'dc17a7b9d945e7f1a3c2b8f4';
const SITE_URL = 'https://stitchbyte.in';

/**
 * IndexNow API Route
 * POST /api/indexnow
 * Body: { urls: string[] }
 * 
 * Notifies Bing, Yandex, and Naver about new/updated URLs for faster indexing.
 * Usage: Call after publishing a blog post, updating a page, or adding a new product.
 */
export async function POST(request: NextRequest) {
    try {
        const { urls } = await request.json();

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json(
                { error: 'urls array is required' },
                { status: 400 }
            );
        }

        // Submit to IndexNow (Bing, Yandex, Naver all share the same protocol)
        const indexNowPayload = {
            host: 'stitchbyte.in',
            key: INDEXNOW_KEY,
            keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
            urlList: urls.map((url: string) =>
                url.startsWith('http') ? url : `${SITE_URL}${url}`
            ),
        };

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(indexNowPayload),
        });

        return NextResponse.json({
            success: true,
            status: response.status,
            message: `Submitted ${urls.length} URL(s) to IndexNow`,
            urls: indexNowPayload.urlList,
        });
    } catch (error) {
        console.error('IndexNow submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit to IndexNow' },
            { status: 500 }
        );
    }
}

// GET handler to verify IndexNow key
export async function GET() {
    return NextResponse.json({
        key: INDEXNOW_KEY,
        status: 'active',
        engines: ['Bing', 'Yandex', 'Naver', 'Seznam', 'Yep'],
    });
}
