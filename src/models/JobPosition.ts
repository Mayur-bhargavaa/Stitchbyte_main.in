import mongoose from 'mongoose';

const JobPositionSchema = new mongoose.Schema({
    // Unique identifier (slug)
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // Basic Info
    title: { type: String, required: true },
    department: {
        type: String,
        required: true,
        enum: ['Engineering', 'Design', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance', 'Other']
    },
    location: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']
    },

    // Description
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    niceToHave: [{ type: String }],

    // Compensation
    salaryRange: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: 'INR' }
    },

    // Benefits
    benefits: [{ type: String }],

    // Work details
    experienceRequired: { type: String },
    workMode: {
        type: String,
        enum: ['On-site', 'Remote', 'Hybrid'],
        default: 'Hybrid'
    },

    // Status
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    openings: { type: Number, default: 1 },

    // Display order
    order: { type: Number, default: 0 },

}, { timestamps: true });

// Generate slug from title before saving
JobPositionSchema.pre('save', async function () {
    if (!this.slug && this.title) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
});

export default mongoose.models.JobPosition || mongoose.model('JobPosition', JobPositionSchema);
