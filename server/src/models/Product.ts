import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  ingredients: string[];
  isFeatured: boolean;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    categoryLabel: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 50 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', ProductSchema);
