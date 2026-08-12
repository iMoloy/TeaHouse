import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Product } from './models/Product.js';
import { Review } from './models/Review.js';
import { News } from './models/News.js';

dotenv.config();

const initialProducts = [
  {
    name: "Milk Tea",
    category: "milk-tea",
    categoryLabel: "Milk Tea",
    price: 4.50,
    rating: 4.9,
    reviewsCount: 128,
    image: "./images/tea-1.png",
    description: "Rich black tea infused with creamy whole milk and natural cane sugar.",
    ingredients: ["Ceylon Black Tea", "Fresh Creamer Milk", "Boba Pearls", "Cane Sugar Syrup"],
    isFeatured: true
  },
  {
    name: "Black Tea",
    category: "black-tea",
    categoryLabel: "Black Tea",
    price: 3.80,
    rating: 4.8,
    reviewsCount: 94,
    image: "./images/tea-2.png",
    description: "Pure organic high-mountain black tea leaves brewed to perfection.",
    ingredients: ["Organic Black Tea Leaves", "Spring Water", "Lemon Twist"],
    isFeatured: true
  },
  {
    name: "Lemon Tea",
    category: "lemon-tea",
    categoryLabel: "Lemon Tea",
    price: 4.20,
    rating: 4.7,
    reviewsCount: 86,
    image: "./images/tea-3.png",
    description: "Zesty freshly squeezed lemons combined with crisp iced tea.",
    ingredients: ["Fresh Meyer Lemons", "Crisp Jasmine Green Tea", "Raw Wild Honey"],
    isFeatured: true
  },
  {
    name: "Green Tea",
    category: "green-tea",
    categoryLabel: "Green Tea",
    price: 4.00,
    rating: 4.9,
    reviewsCount: 150,
    image: "./images/tea-4.png",
    description: "Premium Japanese Matcha-infused green tea packed with antioxidants.",
    ingredients: ["Uji Matcha Powder", "Steeped Sencha Green Tea", "Purified Water"],
    isFeatured: true
  }
];

const initialReviews = [
  {
    name: "Ilham Yuda",
    role: "Businessman",
    avatar: "./images/client.png",
    comment: "We are providing the best and most suitable tea products for customer needs.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Food Critic & Blogger",
    avatar: "./images/client.png",
    comment: "The Tea House offers an unmatched ambiance paired with raw organic ingredients.",
    rating: 5
  }
];

const initialNews = [
  {
    date: "Feb 12, 2027",
    author: "Tea House Team",
    title: "Collecting 8 points for discount",
    excerpt: "Earn loyalty points with every cup purchased!",
    content: "Earn loyalty points with every cup purchased! Accumulate 8 points to unlock a 25% discount coupon.",
    image: "./images/news-1.png"
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/teahouse';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB');

    await Product.deleteMany({});
    await Review.deleteMany({});
    await News.deleteMany({});

    await Product.insertMany(initialProducts);
    await Review.insertMany(initialReviews);
    await News.insertMany(initialNews);

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
