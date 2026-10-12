// Shorter <title> text for blog posts whose full title would push the final title
// (title + " | StitchByte") well past ~60 characters. Only the <title> tag uses these;
// the on-page H1, Open Graph title and JSON-LD headline keep the full post title.
const SEO_TITLES: Record<string, string> = {
    ecommercewebsitedevelopmentfeatureseveryonlinestoreneeds: "E-commerce Website Features Every Store Needs",
    howtooptimizeashopifyproductpageformoreconversions: "Optimize a Shopify Product Page to Convert",
    "10shopifystoremistakesthatcanreduceyoursales": "10 Shopify Store Mistakes That Cut Sales",
    howtobuildasuccessfulshopifystorefromscratch: "Build a Successful Shopify Store from Scratch",
    shopifyvswoocommercewhichecommerceplatformshouldyouchoose: "Shopify vs WooCommerce: Which Should You Pick?",
    shopifywebsitedevelopmentcompleteguideforindianbusinesses: "Shopify Website Guide for Indian Businesses",
    wordpresswebsitedevelopmentbenefitscostsandbestpractices: "WordPress Development: Costs & Best Practices",
    customwebsitevswordpresswhichisbetterforyourbusiness: "Custom Website vs WordPress: Which Is Better?",
    howprofessionalwebdesignbuildstrustandincreasessales: "How Web Design Builds Trust and Increases Sales",
    mobilefirstwebdesignwhyyourbusinesswebsiteneedsit: "Mobile-First Web Design: Why Your Site Needs It",
    howfastshouldabusinesswebsiteloadcorewebvitalsexplained: "How Fast Should a Website Load? Core Web Vitals",
    websitevslandingpagewhichonedoesyourbusinessneed: "Website vs Landing Page: Which Do You Need?",
    whatmakesahighconvertingbusinesswebsitein2026: "What Makes a High-Converting Website in 2026?",
    howtochoosetherightwebdevelopmentcompanyforyourbusiness: "How to Choose the Right Web Development Company",
    websitedevelopmentforsmallbusinessescompleteguidefor2026: "Small Business Website Development: 2026 Guide",
};

export function blogSeoTitle(slug: string, title: string): string {
    return SEO_TITLES[slug] ?? title;
}
