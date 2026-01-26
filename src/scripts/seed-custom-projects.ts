import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://DBmayur:Mayur%402608@cluster0.ytcpzbb.mongodb.net/stitchbyte_chatbot";

const CustomProjectSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, required: true },
    features: { type: [String], required: true },
    link: { type: String },
    category: { type: String, enum: ['websites', 'applications'], required: true },
    technologies: { type: [String], default: [] },
    clientName: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

const CustomProject = mongoose.models.CustomProject || mongoose.model('CustomProject', CustomProjectSchema);

const customProjects = [
    {
        id: 'lal-sweets',
        title: 'Lal Sweets Ecom Website',
        slug: 'lal-sweets',
        image: '/projects/lal-sweets.png',
        features: [
            'Modern sweets store with responsive design for smooth shopping.',
            'Category-wise sweets, snacks, and festive combo listings.',
            'Quick checkout with discounts and first-order offers.',
            'SEO-friendly structure with dynamic product showcase.',
        ],
        link: '#',
        category: 'websites',
        technologies: ['Next.js', 'React', 'MongoDB'],
        isActive: true,
        order: 1,
    },
    {
        id: 'kirtilals',
        title: 'Kirtilals : Luxury Website',
        slug: 'kirtilals',
        image: '/projects/kirtilals.png',
        features: [
            'Premium diamond-jewellery store with elegant UX for luxury buyers.',
            '1,500+ certified designs neatly organised for quick browsing.',
            'Integrated filters (metal type, gemstone, price) to refine search fast.',
            'Mobile-first responsive checkout designed to boost conversions.',
        ],
        link: '#',
        category: 'websites',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        isActive: true,
        order: 2,
    },
    {
        id: 'tradescribe',
        title: 'Tradescribe: Trading Platform',
        slug: 'tradescribe',
        image: '/projects/tradescribe.png',
        features: [
            'Built a sleek journaling platform for tracking trades with AI-backed analytics.',
            'Enabled seamless CSV/broker upload to sync trading activity in real time.',
            'Designed interactive dashboards showing win rate, profit/loss & strategy insights.',
            'Created mobile-friendly UI optimised for Indian traders and multi-broker support.',
        ],
        link: '#',
        category: 'applications',
        technologies: ['React Native', 'Python', 'TensorFlow'],
        isActive: true,
        order: 3,
    },
    {
        id: 'murzban',
        title: 'Murzban: Clothing Luxury',
        slug: 'murzban',
        image: '/projects/murzban.png',
        features: [
            "Modern online store for curated men's & women's designer fashion.",
            "Clear category hierarchy: women's designers, men's labels, accessories.",
            '"Just In" and "Bestsellers" sections boost visibility of new arrivals.',
            'Free shipping & global delivery emphasised for international buyers.',
        ],
        link: '#',
        category: 'websites',
        technologies: ['Shopify', 'React', 'GraphQL'],
        isActive: true,
        order: 4,
    },
];

async function seedCustomProjects() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        console.log('🧹 Clearing existing custom projects...');
        await CustomProject.deleteMany({});

        console.log('📦 Inserting custom projects...');
        for (const project of customProjects) {
            await CustomProject.create(project);
            console.log(`  ✅ Created: ${project.title}`);
        }

        console.log(`\n🎉 Successfully seeded ${customProjects.length} custom projects!`);
    } catch (error) {
        console.error('❌ Error seeding:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

seedCustomProjects();
