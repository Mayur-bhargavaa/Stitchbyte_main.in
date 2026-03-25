import mongoose, { Document, Schema } from "mongoose";

export interface IReviewCard {
  name: string;
  reviewTitle?: string;
  reviewText: string;
  rating: number;
  avatarUrl?: string;
  serviceType?: string;
  projectMonth?: string;
  projectYear?: string;
  projectSize?: string;
}

export interface ISiteContentSettings extends Document {
  key: string;
  reviewCards: IReviewCard[];
  reviewImages: string[];
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
            reviewTitle: { type: String, default: "" },
            reviewText: { type: String, default: "" },
            rating: { type: Number, min: 1, max: 5, default: 5 },
            avatarUrl: { type: String, default: "" },
            serviceType: { type: String, default: "" },
            projectMonth: { type: String, default: "" },
            projectYear: { type: String, default: "" },
            projectSize: { type: String, default: "" },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
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
