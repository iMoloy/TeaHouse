"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Product_js_1 = require("./models/Product.js");
const Review_js_1 = require("./models/Review.js");
const News_js_1 = require("./models/News.js");
dotenv_1.default.config();
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
        await mongoose_1.default.connect(mongoUri);
        console.log('[Seed] Connected to MongoDB');
        await Product_js_1.Product.deleteMany({});
        await Review_js_1.Review.deleteMany({});
        await News_js_1.News.deleteMany({});
        await Product_js_1.Product.insertMany(initialProducts);
        await Review_js_1.Review.insertMany(initialReviews);
        await News_js_1.News.insertMany(initialNews);
        console.log('✅ Database seeded successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
}
seed();
