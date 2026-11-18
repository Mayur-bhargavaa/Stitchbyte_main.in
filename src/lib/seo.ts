const MAX_DESCRIPTION = 155;

// Trim page-derived text to a meta description of at most `max` characters.
// Prefers ending at a sentence boundary, otherwise at a word boundary with an ellipsis.
export function metaDescription(text: string | undefined | null, max: number = MAX_DESCRIPTION): string | undefined {
    if (!text) return undefined;
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;

    const window = clean.slice(0, max);
    const sentenceEnd = Math.max(window.lastIndexOf(". "), window.lastIndexOf("! "), window.lastIndexOf("? "));
    if (sentenceEnd >= max * 0.5) return window.slice(0, sentenceEnd + 1);

    const cut = window.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");
    return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/, "")}…`;
}

// Next.js resets `title.template` after any intermediate layout whose title is a plain
// string (e.g. /blog/layout.tsx), so nested dynamic pages (/blog/[slug], /prebuilt/[slug], ...)
// do not get the root "%s | StitchByte" template. Those pages call this instead.
// Keep the suffix in sync with `title.template` in src/app/layout.tsx.
export const BRAND_SUFFIX = " | StitchByte";
export function withBrand(title: string): string {
    return `${title}${BRAND_SUFFIX}`;
}
