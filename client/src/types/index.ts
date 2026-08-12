export interface Product {
  _id: string;
  id?: number;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  ingredients: string[];
  isFeatured?: boolean;
}

export interface Review {
  _id: string;
  id?: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

export interface News {
  _id: string;
  id?: number;
  date: string;
  author: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
