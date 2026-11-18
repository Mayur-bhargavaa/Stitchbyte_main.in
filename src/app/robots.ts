import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/restaurant/admin/',
                    '/restaurant/merchant/',
                    '/restaurant/offline',
                ],
            },
            // Allow AI search crawlers explicitly for AI search visibility
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/api/', '/restaurant/admin/', '/restaurant/merchant/'],
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            // Block training-only crawlers
            {
                userAgent: 'Bytespider',
                disallow: '/',
            },
            {
                userAgent: 'CCBot',
                disallow: '/',
            },
        ],
        sitemap: 'https://stitchbyte.in/sitemap.xml',
    };
}
