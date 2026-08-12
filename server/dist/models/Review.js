"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: { type: String, default: 'Tea Enthusiast' },
    avatar: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, default: 5 }
}, { timestamps: true });
exports.Review = (0, mongoose_1.model)('Review', ReviewSchema);
