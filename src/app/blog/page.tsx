import { getBlogPosts } from "@/lib/content";
import BlogClient from "./BlogClient";

export const revalidate = 3600;

export default async function BlogPage() {
    const blogPosts = await getBlogPosts();
    return <BlogClient blogPosts={blogPosts} />;
}
