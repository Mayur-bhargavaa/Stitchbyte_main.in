// Server-rendered JSON-LD. "<" is escaped so text from the database or CMS
// (titles, excerpts) can never close the script tag early.
export function serializeJsonLd(data: unknown): string {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data, id }: { data: unknown; id?: string }) {
    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        />
    );
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `https://stitchbyte.in${item.path}`,
        })),
    };
}
