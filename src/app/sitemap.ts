import { MetadataRoute } from 'next';
import { blogPrisma } from '@/lib/prisma';
import connectDB from '@/lib/mongoose';
import JobPosition from '@/models/JobPosition';
import CustomProject from '@/models/CustomProject';
import MarketingCaseStudy from '@/models/MarketingCaseStudy';
import { connectToDatabase } from '@/lib/mongodb';
import { AUTOMATION_ITEMS } from '@/data/automation-items';

const BASE_URL = 'https://stitchbyte.in';

// Re-generate hourly so new posts/projects show up without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/`, changeFrequency: 'monthly', priority: 1 },
        { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.5 },
        { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/refund-policy`, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/careers`, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/customized`, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/prebuilt`, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/ui-ux`, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/work`, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/marketing`, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/restaurant`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/reviews`, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/automation`, changeFrequency: 'monthly', priority: 0.8 },
        ...AUTOMATION_ITEMS.map((item) => ({
            url: `${BASE_URL}/automation/${item.slug}`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];

    // Try fetching Blogs
    try {
        const blogs = await blogPrisma.blog.findMany({
            where: { status: 'published' },
            select: { slug: true, updatedAt: true },
        });
        blogs.forEach((blog) => {
            routes.push({
                url: `${BASE_URL}/blog/${blog.slug}`,
                lastModified: blog.updatedAt,
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    } catch (error) {
        console.error('Error fetching blogs for sitemap:', error);
    }

    // Try fetching jobs, custom projects, and case studies (Mongoose)
    try {
        await connectDB();

        const jobs = await JobPosition.find({ isActive: true }).select('slug updatedAt');
        jobs.forEach((job) => {
            routes.push({
                url: `${BASE_URL}/careers/${job.slug || job._id}`,
                lastModified: job.updatedAt,
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });

        // Fixed route folder name to match [slug] directory (/customized/ instead of /custom-projects/)
        const projects = await CustomProject.find({ isActive: true }).select('slug updatedAt');
        projects.forEach((project) => {
            routes.push({
                url: `${BASE_URL}/customized/${project.slug || project._id}`,
                lastModified: project.updatedAt,
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });

        // Add dynamic marketing case studies (performance + seo)
        const studies = await MarketingCaseStudy.find({ isActive: true }).select('slug updatedAt');
        studies.forEach((study) => {
            routes.push({
                url: `${BASE_URL}/marketing/${study.slug || study._id}`,
                lastModified: study.updatedAt,
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    } catch (error) {
        console.error('Error fetching mongoose models for sitemap:', error);
    }

    // Try fetching prebuilt products (MongoDB Driver)
    try {
        const { db } = await connectToDatabase();
        const products = await db.collection('prebuilt_products')
            .find({ isActive: true })
            .project({ id: 1, updatedAt: 1 })
            .toArray();

        products.forEach((product) => {
            routes.push({
                url: `${BASE_URL}/prebuilt/${product.id}`,
                lastModified: product.updatedAt,
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    } catch (error) {
        console.error('Error fetching prebuilt products for sitemap:', error);
    }

    return routes;
}
