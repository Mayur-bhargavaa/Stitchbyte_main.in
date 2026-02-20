import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding blogs...')

    const blogs = [
        {
            title: 'Scaling Your AI SaaS from 1 to 100 Customers',
            slug: 'scaling-ai-saas',
            excerpt: 'Learn the strategies to acquire your first 100 customers for your AI SaaS product.',
            content: 'Acquiring the first 100 customers is the hardest part of building a SaaS business. This guide covers how to leverage communities, cold outreach, and content marketing to validate your idea and get paying users quickly.',
            author: 'StitchByte Team',
            category: 'Strategy',
            readTime: '5 min read',
            published: true,
            // Example of a blog post WITH an image
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
        },
        {
            title: 'Why Founders Should Focus on Revenue First',
            slug: 'founders-revenue-first',
            excerpt: 'Stop worrying about optimization and start worrying about your bottom line. How to prioritize cash flow.',
            content: 'Many founders get caught up in building the perfect product, optimizing their tech stack, or designing the perfect logo. While these are important, they do not guarantee survival. The number one priority for an early-stage startup should be generating revenue. Without revenue, you have a hobby, not a business. Focus on talking to customers, understanding their pain points, and getting them to pay for a solution as quickly as possible.',
            author: 'StitchByte Team',
            category: 'Business',
            readTime: '4 min read',
            published: true,
            // Example of a blog post WITHOUT an image.
            imageUrl: null
        }
    ]

    for (const blog of blogs) {
        await prisma.blog.upsert({
            where: { slug: blog.slug },
            update: blog,
            create: blog,
        })
    }

    console.log('Blogs seeded successfully.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
