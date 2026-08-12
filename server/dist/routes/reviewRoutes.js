"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Review_js_1 = require("../models/Review.js");
const router = (0, express_1.Router)();
const fallbackReviews = [
    {
        _id: "1",
        name: "Ilham Yuda",
        role: "Businessman",
        avatar: "./images/client.png",
        comment: "We are providing the best and most suitable tea products for customer needs. The milk tea here is phenomenal!",
        rating: 5
    },
    {
        _id: "2",
        name: "Sarah Jenkins",
        role: "Food Critic & Blogger",
        avatar: "./images/client.png",
        comment: "The Tea House offers an unmatched ambiance paired with raw organic ingredients.",
        rating: 5
    },
    {
        _id: "3",
        name: "Tanvir Hossain",
        role: "Software Engineer",
        avatar: "./images/client.png",
        comment: "Great user experience, fast service, and the boba textures are spot on.",
        rating: 5
    }
];
// GET All Reviews
router.get('/', async (_req, res) => {
    try {
        const reviews = await Review_js_1.Review.find().exec();
        if (!reviews || reviews.length === 0) {
            return res.json(fallbackReviews);
        }
        return res.json(reviews);
    }
    catch (error) {
        return res.json(fallbackReviews);
    }
});
// POST Create Review
router.post('/', async (req, res) => {
    try {
        const { name, role, avatar, comment, rating } = req.body;
        const newReview = await Review_js_1.Review.create({
            name,
            role: role || 'Tea Lover',
            avatar: avatar || './images/client.png',
            comment,
            rating: rating || 5
        });
        return res.status(201).json(newReview);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.default = router;
