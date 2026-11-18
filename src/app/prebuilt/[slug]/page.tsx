import { notFound } from "next/navigation";
import { getPrebuiltProduct, getPrebuiltProducts } from "@/lib/content";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import ProductDetailClient, { type ProductData } from "./ProductDetailClient";

export const revalidate = 3600;

export async function generateStaticParams() {
    const products = await getPrebuiltProducts<{ id: string }>();
    return products.map((p) => ({ slug: p.id }));
}

export default async function ProductDetailPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const product = await getPrebuiltProduct<ProductData>(slug);

    if (!product) {
        notFound();
    }

    return (
        <>
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", path: "/" },
                { name: "Prebuilt Solutions", path: "/prebuilt" },
                { name: product.name, path: `/prebuilt/${product.id}` },
            ])} />
            <ProductDetailClient product={product} />
        </>
    );
}
