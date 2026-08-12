"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_js_1 = require("../models/Order.js");
const router = (0, express_1.Router)();
// POST Create Order
router.post('/', async (req, res) => {
    try {
        const { customerName, customerEmail, items, totalAmount } = req.body;
        if (!customerName || !customerEmail || !items || items.length === 0) {
            return res.status(400).json({ error: 'Invalid order details provided' });
        }
        const order = await Order_js_1.Order.create({
            customerName,
            customerEmail,
            items,
            totalAmount,
            status: 'pending'
        });
        return res.status(201).json({
            message: 'Order created successfully',
            orderId: order._id,
            order
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
// GET All Orders (Admin or User history)
router.get('/', async (_req, res) => {
    try {
        const orders = await Order_js_1.Order.find().sort({ createdAt: -1 }).exec();
        return res.json(orders);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.default = router;
