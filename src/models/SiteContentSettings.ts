import mongoose, { Document, Schema } from "mongoose";

export interface IReviewCard {
  name: string;
  role?: string;
  reviewTitle?: string;
  reviewText: string;
  rating: number;
  avatarUrl?: string;
  serviceType?: string;
  projectMonth?: string;
  projectYear?: string;
  projectSize?: string;
  isVerified?: boolean;
  tags?: string[];
  projectDuration?: string;
}

export interface ISpotlightReel {
  id: string;
  title: string;
  category?: string;
  duration?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  reelUrl?: string;
  isActive?: boolean;
  order?: number;
}

export { defaultSpotlightReels } from "@/lib/reels-data";

export interface ISiteContentSettings extends Document {
  key: string;
  reviewCards: IReviewCard[];
  reviewImages: string[];
  instagramReelUrl?: string;
  spotlightVideoUrl?: string;
  mediaType?: "instagram" | "uploaded";
  spotlightVideoUrls?: string[];
  spotlightReels?: ISpotlightReel[];
  createdAt: Date;
  updatedAt: Date;
}

const SiteContentSettingsSchema = new Schema<ISiteContentSettings>(
  {
    key: { type: String, required: true, unique: true, default: "homepage" },
    reviewCards: {
      type: [
        new Schema(
          {
            name: { type: String, default: "" },
            role: { type: String, default: "" },
            reviewTitle: { type: String, default: "" },
            reviewText: { type: String, default: "" },
            rating: { type: Number, min: 1, max: 5, default: 5 },
            avatarUrl: { type: String, default: "" },
            serviceType: { type: String, default: "" },
            projectMonth: { type: String, default: "" },
            projectYear: { type: String, default: "" },
            projectSize: { type: String, default: "" },
            isVerified: { type: Boolean, default: false },
            tags: { type: [String], default: [] },
            projectDuration: { type: String, default: "" },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    reviewImages: { type: [String], default: [] },
    instagramReelUrl: { type: String, default: "https://www.instagram.com/reel/DZW7Qa8RDfc/?igsh=Zno2OWN2Y3E5OHBj" },
    spotlightVideoUrl: { type: String, default: "" },
    mediaType: { type: String, enum: ["instagram", "uploaded"], default: "instagram" },
    spotlightVideoUrls: { type: [String], default: [] },
    spotlightReels: {
      type: [
        new Schema(
          {
            id: { type: String, required: true },
            title: { type: String, default: "" },
            category: { type: String, default: "Culture" },
            duration: { type: String, default: "0:45" },
            thumbnailUrl: { type: String, default: "" },
            videoUrl: { type: String, default: "" },
            reelUrl: { type: String, default: "" },
            isActive: { type: Boolean, default: true },
            order: { type: Number, default: 0 },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "site_content_settings",
  }
);

export default
  mongoose.models.SiteContentSettings ||
  mongoose.model<ISiteContentSettings>("SiteContentSettings", SiteContentSettingsSchema);
