"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
