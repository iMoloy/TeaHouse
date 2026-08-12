import { Schema, model, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, default: 'Tea House Team' },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

export const News = model<INews>('News', NewsSchema);
