import { Router, Request, Response } from 'express';
import { News } from '../models/News.js';

const router = Router();

const fallbackNews = [
  {
    _id: "1",
    date: "Feb 12, 2027",
    author: "Tea House Team",
    title: "Collecting 8 points for discount",
    excerpt: "There are many variations of passages of Lorem Ipsum available.",
    content: "Earn loyalty points with every cup purchased! Accumulate 8 points to unlock a 25% discount coupon.",
    image: "./images/news-1.png"
  },
  {
    _id: "2",
    date: "Feb 15, 2027",
    author: "Master Brewer",
    title: "The Art of Cold Brew Matcha",
    excerpt: "Discover how slow cold steeping brings out the subtle sweetness.",
    content: "Cold brewing tea extracts rich flavors without harsh tannins by steeping Sencha leaves for 12 hours.",
    image: "./images/news-2.png"
  },
  {
    _id: "3",
    date: "Feb 18, 2027",
    author: "Sustainability Director",
    title: "Eco-Friendly & Zero Waste Tea Cups",
    excerpt: "We are proud to introduce 100% biodegradable cornstarch cups.",
    content: "Protecting nature is at the heart of our mission. All packaging materials are compostable.",
    image: "./images/news-3.png"
  }
];

// GET All News
router.get('/', async (_req: Request, res: Response) => {
  try {
    const articles = await News.find().exec();
    if (!articles || articles.length === 0) {
      return res.json(fallbackNews);
    }
    return res.json(articles);
  } catch (error) {
    return res.json(fallbackNews);
  }
});

export default router;
