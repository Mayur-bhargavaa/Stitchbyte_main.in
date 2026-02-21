import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/restaurant/admin/',
                '/restaurant/merchant/',
                '/restaurant/offline',
            ],
        },
        sitemap: 'https://stitchbyte.in/sitemap.xml',
    };
}
