"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_js_1 = require("./config/db.js");
const productRoutes_js_1 = __importDefault(require("./routes/productRoutes.js"));
const reviewRoutes_js_1 = __importDefault(require("./routes/reviewRoutes.js"));
const newsRoutes_js_1 = __importDefault(require("./routes/newsRoutes.js"));
const orderRoutes_js_1 = __importDefault(require("./routes/orderRoutes.js"));
const auth_js_1 = require("./lib/auth.js");
const node_1 = require("better-auth/node");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect Database
(0, db_js_1.connectDB)();
// Middlewares
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
// Better Auth API Endpoint
app.all('/api/auth/*', (0, node_1.toNodeHandler)(auth_js_1.auth));
// Health Check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'TeaHouse Express TS Server running smoothly' });
});
// REST API Endpoints
app.use('/api/products', productRoutes_js_1.default);
app.use('/api/reviews', reviewRoutes_js_1.default);
app.use('/api/news', newsRoutes_js_1.default);
app.use('/api/orders', orderRoutes_js_1.default);
app.listen(PORT, () => {
    console.log(`🚀 [TeaHouse Server] Express running on http://localhost:${PORT}`);
});
