# 🍵 The Tea House - Full-Stack E-Commerce & Landing Page

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.10-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Better--Auth-1.1-orange)](https://better-auth.com/)
[![Vercel](https://img.shields.io/badge/Deploy_Client-Vercel-black?logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Deploy_Server-Render-46E3B7?logo=render)](https://render.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![AI Generated](https://img.shields.io/badge/Built_With-Antigravity_AI-purple)](https://deepmind.google/)

A modern, 100% dynamic, full-stack tea shop landing page and e-commerce application built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Express.js**, **MongoDB (Mongoose)**, and **Better Auth**.

> 🤖 **AI Assistance Disclaimer**: This project was fully architected, designed, and implemented using **Google DeepMind Antigravity AI** as an autonomous AI pair programmer.
> 
> 📋 **Project Documentation**:
> - [DEPLOYMENT.md](./DEPLOYMENT.md) - Step-by-Step Vercel & Render Deployment Guide
> - [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Full-Stack Architecture & Roadmap Plan
> - [ANTIGRAVITY.md](./ANTIGRAVITY.md) / [CLAUDE.md](./CLAUDE.md) - AI Agent Guidelines & Coding Standards
> - [LICENSE](./LICENSE) - Open Source MIT License

---

## ✨ Features

- **🍵 Dynamic Product Catalog**: Browse organic teas dynamically fetched from MongoDB database.
- **🔍 Real-Time Search & Category Filters**: Instant filtering by Milk Tea, Black Tea, Lemon Tea, Green Tea, or live search query.
- **👁️ Product Quick View Modal**: Modal popup with detailed ingredients, star ratings, price calculation, and quantity controls (`+`/`-`).
- **🛒 Shopping Cart Drawer**: Interactive side-cart drawer with badge counter, item deletion, subtotal calculations, and checkout.
- **⭐ Super Clients Carousel**: Auto-rotating testimonial slider with manual controls and indicator dots.
- **📰 News & Articles Modal**: Dynamic news grid featuring brewing guides and eco-friendly announcements with full-article reader modal.
- **🔐 Better Auth Authentication**: User registration and login modal with session management.
- **🔔 Toast Notification System**: Animated `react-toastify` feedback for cart additions, email validation, and checkout completion.
- **⌛ Loading Spinner & Skeletons**: Glassmorphic tea cup spinner and product skeleton loaders during async API fetching.

---

## 📂 Project Architecture

```
TeaHouse/
├── ANTIGRAVITY.md               # AI Agent Guidelines & Coding Standards
├── CLAUDE.md                    # Alias AI Rules File
├── DEPLOYMENT.md               # Detailed Vercel & Render Deployment Guide
├── IMPLEMENTATION_PLAN.md      # Detailed Step-by-Step AI Architecture Plan
├── LICENSE                     # Open Source MIT License
├── README.md                   # Project Documentation & Badges
│
├── client/                     # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/                # App Router Layout & Pages (Home, About, Products, Services, FAQs, Contact)
│   │   ├── components/         # React UI Components (Navbar, Hero, Products, Carousel, Modals, Spinner)
│   │   ├── lib/                # REST API Client & Better Auth Client SDK
│   │   └── types/              # TypeScript Interfaces
│   ├── public/images/          # High-resolution Tea House assets
│   ├── vercel.json             # Vercel Deployment Configuration
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── server/                     # Express TypeScript Backend
    ├── src/
    │   ├── config/             # MongoDB Mongoose Connection
    │   ├── lib/                # Better Auth Configuration
    │   ├── models/             # Mongoose Models (Product, Review, News, Order, User)
    │   ├── routes/             # REST API Routes (/api/products, /api/reviews, /api/news, /api/orders)
    │   ├── index.ts            # Server Entry Point
    │   └── seed.ts             # Database Seeding Script
    ├── render.yaml             # Render Deployment Blueprint
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

---

## 🛠️ Environment Variables Setup

Create a `.env` file in `server/` and `.env.local` in `client/` based on `.env.example`:

### `server/.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/teahouse
BETTER_AUTH_SECRET=your_super_secret_better_auth_key_here
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

### `client/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
```

---

## 🚀 Deployment Instructions

For complete step-by-step instructions on deploying the client to **Vercel** and the backend server to **Render**, please refer to the **[DEPLOYMENT.md](./DEPLOYMENT.md)** guide.

---

## 📜 License & Credits

- Built with ❤️ using **Google DeepMind Antigravity AI**.
- Released under the [MIT License](./LICENSE).
