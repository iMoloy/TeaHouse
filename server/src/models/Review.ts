import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Tea Enthusiast' },
    avatar: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, default: 5 }
  },
  { timestamps: true }
);

export const Review = model<IReview>('Review', ReviewSchema);
