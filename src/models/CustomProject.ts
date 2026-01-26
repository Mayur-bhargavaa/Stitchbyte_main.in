import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomProject extends Document {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    features: string[];
    link: string;
    category: 'websites' | 'applications';
    technologies: string[];
    clientName?: string;
    completedDate?: string;
    isActive: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const CustomProjectSchema = new Schema<ICustomProject>(
    {
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
        completedDate: { type: String },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

// Create indexes for faster queries
CustomProjectSchema.index({ category: 1 });
CustomProjectSchema.index({ slug: 1 });
CustomProjectSchema.index({ isActive: 1 });
CustomProjectSchema.index({ order: 1 });

export default mongoose.models.CustomProject || mongoose.model<ICustomProject>('CustomProject', CustomProjectSchema);
