import mongoose, { Document, Schema } from "mongoose";

export interface IUiUxProject extends Document {
  id: string;
  slug: string;
  title: string;
  brand: string;
  projectType: "figma" | "pdf" | "website" | "other";
  projectUrl: string;
  thumbnailUrl: string;
  summary: string;
  tags: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const UiUxProjectSchema = new Schema<IUiUxProject>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    brand: { type: String, default: "" },
    projectType: {
      type: String,
      enum: ["figma", "pdf", "website", "other"],
      default: "other",
    },
    projectUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: "" },
    summary: { type: String, required: true },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: "ui_ux_projects",
  }
);

UiUxProjectSchema.index({ isActive: 1, order: 1 });

export default
  mongoose.models.UiUxProject ||
  mongoose.model<IUiUxProject>("UiUxProject", UiUxProjectSchema);
