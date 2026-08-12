"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const mongoose_1 = require("mongoose");
const NewsSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, default: 'Tea House Team' },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });
exports.News = (0, mongoose_1.model)('News', NewsSchema);
