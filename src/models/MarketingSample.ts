import mongoose, { Document, Schema } from "mongoose";

export interface IMarketingSample extends Document {
  id: string;
  title: string;
  type: "image" | "video";
  src: string;
  category: string;
  aspectRatio: string;
  ratioClass: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const MarketingSampleSchema = new Schema<IMarketingSample>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], default: "image" },
    src: { type: String, required: true },
    category: { type: String, required: true },
    aspectRatio: { type: String, default: "3/4" },
    ratioClass: { type: String, default: "aspect-[3/4]" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: "marketing_samples",
  }
);

MarketingSampleSchema.index({ isActive: 1, order: 1 });

export default
  mongoose.models.MarketingSample ||
  mongoose.model<IMarketingSample>("MarketingSample", MarketingSampleSchema);
