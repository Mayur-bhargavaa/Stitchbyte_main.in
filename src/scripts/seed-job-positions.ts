import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://DBmayur:Mayur%402608@cluster0.ytcpzbb.mongodb.net/stitchbyte_chatbot";

const JobPositionSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    niceToHave: [{ type: String }],
    salaryRange: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: 'INR' }
    },
    benefits: [{ type: String }],
    experienceRequired: { type: String },
    workMode: { type: String, default: 'Hybrid' },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    openings: { type: Number, default: 1 },
    order: { type: Number, default: 0 },
}, { timestamps: true });

const JobPosition = mongoose.models.JobPosition || mongoose.model('JobPosition', JobPositionSchema);

const jobPositions = [
    {
        slug: 'full-stack-developer',
        title: 'Full Stack Developer',
        department: 'Engineering',
        location: 'Remote / Jaipur, Rajasthan',
        type: 'Full-time',
        description: 'Join our engineering team to build innovative web applications using Next.js, React, and Node.js. You will work on exciting projects for clients across various industries.',
        responsibilities: [
            'Design and develop responsive web applications using React/Next.js',
            'Build scalable backend APIs using Node.js and MongoDB',
            'Collaborate with designers to implement pixel-perfect UIs',
            'Write clean, maintainable, and well-documented code',
            'Participate in code reviews and technical discussions',
            'Mentor junior developers and share knowledge'
        ],
        requirements: [
            '3+ years of experience in full-stack development',
            'Strong proficiency in React.js and Next.js',
            'Experience with Node.js and Express.js',
            'MongoDB or PostgreSQL database experience',
            'Good understanding of REST APIs and GraphQL',
            'Familiarity with Git version control'
        ],
        niceToHave: [
            'Experience with React Native',
            'Knowledge of cloud services (AWS, GCP, Vercel)',
            'Experience with TypeScript',
            'Understanding of CI/CD pipelines'
        ],
        salaryRange: { min: 600000, max: 1200000, currency: 'INR' },
        benefits: [
            'Competitive salary with performance bonuses',
            'Flexible work hours and remote work options',
            'Health insurance for you and family',
            'Learning and development budget',
            'Team outings and fun activities'
        ],
        experienceRequired: '3+ years',
        workMode: 'Hybrid',
        isActive: true,
        isFeatured: true,
        openings: 2,
        order: 1
    },
    {
        slug: 'ui-ux-designer',
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Remote / Jaipur, Rajasthan',
        type: 'Full-time',
        description: 'Create beautiful, intuitive user experiences for our pre-built and custom solutions. Work closely with developers to bring designs to life.',
        responsibilities: [
            'Design user interfaces for web and mobile applications',
            'Create wireframes, prototypes, and high-fidelity mockups',
            'Conduct user research and usability testing',
            'Develop and maintain design systems',
            'Collaborate with developers for design implementation',
            'Stay updated with latest design trends and tools'
        ],
        requirements: [
            '2+ years of experience in UI/UX design',
            'Proficiency in Figma and Adobe Creative Suite',
            'Strong portfolio showcasing web/mobile designs',
            'Understanding of user-centered design principles',
            'Experience with prototyping and wireframing',
            'Good communication and presentation skills'
        ],
        niceToHave: [
            'Basic knowledge of HTML/CSS',
            'Experience with motion design',
            'Familiarity with design systems',
            'Experience in SaaS product design'
        ],
        salaryRange: { min: 400000, max: 800000, currency: 'INR' },
        benefits: [
            'Competitive salary',
            'Creative freedom and ownership',
            'Latest design tools and software',
            'Health insurance',
            'Flexible work schedule'
        ],
        experienceRequired: '2+ years',
        workMode: 'Hybrid',
        isActive: true,
        isFeatured: false,
        openings: 1,
        order: 2
    },
    {
        slug: 'business-development-executive',
        title: 'Business Development Executive',
        department: 'Sales',
        location: 'Jaipur, Rajasthan',
        type: 'Full-time',
        description: 'Drive growth by identifying new business opportunities and building client relationships. Help us expand our client base and revenue.',
        responsibilities: [
            'Identify and pursue new business opportunities',
            'Build and maintain relationships with potential clients',
            'Conduct product demos and presentations',
            'Prepare proposals and negotiate contracts',
            'Achieve monthly and quarterly sales targets',
            'Maintain CRM with accurate lead information'
        ],
        requirements: [
            '2+ years of experience in B2B sales',
            'Excellent communication and negotiation skills',
            'Experience with CRM tools (HubSpot, Salesforce)',
            'Understanding of IT/software industry',
            'Self-motivated with a results-driven approach',
            'Fluent in English and Hindi'
        ],
        niceToHave: [
            'Experience in selling software/SaaS products',
            'Network in the restaurant/hospitality industry',
            'MBA or relevant business degree',
            'Experience with digital marketing'
        ],
        salaryRange: { min: 300000, max: 600000, currency: 'INR' },
        benefits: [
            'Base salary + attractive commissions',
            'Performance bonuses',
            'Travel allowance',
            'Health insurance',
            'Career growth opportunities'
        ],
        experienceRequired: '2+ years',
        workMode: 'On-site',
        isActive: true,
        isFeatured: false,
        openings: 2,
        order: 3
    }
];

async function seedJobPositions() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        console.log('🧹 Clearing existing job positions...');
        await JobPosition.deleteMany({});

        console.log('📦 Inserting job positions...');
        for (const job of jobPositions) {
            await JobPosition.create(job);
            console.log(`  ✅ Created: ${job.title}`);
        }

        console.log(`\n🎉 Successfully seeded ${jobPositions.length} job positions!`);
    } catch (error) {
        console.error('❌ Error seeding:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

seedJobPositions();
