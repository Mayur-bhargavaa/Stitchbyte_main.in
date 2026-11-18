import { getPrebuiltProducts } from "@/lib/content";
import PrebuiltClient, { type Product } from "./PrebuiltClient";

export const revalidate = 3600;

export default async function PrebuiltPage() {
    const products = await getPrebuiltProducts<Product>();
    return <PrebuiltClient products={products} />;
}
