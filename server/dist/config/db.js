"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/teahouse';
        await mongoose_1.default.connect(connStr);
        console.log(`[MongoDB] Connected successfully to ${connStr}`);
    }
    catch (error) {
        console.warn('[MongoDB] Local MongoDB connection failed. Running in memory fallback mode:', error.message);
    }
};
exports.connectDB = connectDB;
