import mongoose, { Document, Schema } from "mongoose";

export interface ISiteContentSettings extends Document {
  key: string;
  reviewImages: string[];
  createdAt: Date;
  updatedAt: Date;
}

const SiteContentSettingsSchema = new Schema<ISiteContentSettings>(
  {
    key: { type: String, required: true, unique: true, default: "homepage" },
    reviewImages: { type: [String], default: [] },
  },
  {
    timestamps: true,
    collection: "site_content_settings",
  }
);

export default
  mongoose.models.SiteContentSettings ||
  mongoose.model<ISiteContentSettings>("SiteContentSettings", SiteContentSettingsSchema);
