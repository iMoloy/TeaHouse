# 🍵 The Tea House - Full-Stack E-Commerce & Management Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://teahouse-client.vercel.app)
[![API Status](https://img.shields.io/badge/Live_API-Render-46E3B7?style=for-the-badge&logo=render)](https://teahouse-s1zl.onrender.com/api/health)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](./LICENSE)

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.10-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Better--Auth-1.1-orange)](https://better-auth.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![AI Pair Programmed](https://img.shields.io/badge/Built_With-Google_Antigravity_AI-purple)](https://deepmind.google/)

A modern, 100% dynamic, enterprise full-stack tea shop platform and e-commerce application built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Express.js**, **MongoDB (Mongoose)**, and **Better Auth**.

---

## 🔗 Live Demo Links

- 🌐 **Frontend Client (Vercel)**: [https://teahouse-client.vercel.app](https://teahouse-client.vercel.app)
- ⚙️ **Backend Server (Render)**: [https://teahouse-s1zl.onrender.com](https://teahouse-s1zl.onrender.com)
- 📊 **Health Check Endpoint**: [https://teahouse-s1zl.onrender.com/api/health](https://teahouse-s1zl.onrender.com/api/health)

---

## ✨ Features Breakdown

### 🛒 Client & Shopping Experience
- **🍵 Dynamic Product Catalog**: Browse organic teas dynamically fetched from MongoDB database.
- **🔍 Real-Time Search & Category Filters**: Instant filtering by Milk Tea, Black Tea, Lemon Tea, Green Tea, or live search query.
- **❤️ Favorites / Wishlist System**: Toggle heart icons on products and view saved teas in the `❤️ Favorites` tab.
- **👁️ Product Quick View Modal**: View ingredient tags, star ratings, price calculations, and quantity controls (`+`/`-`).
- **🛒 Shopping Cart Drawer**: Interactive side-cart drawer with badge counter, item deletion, subtotal calculations, and checkout.
- **⭐ Super Clients Carousel**: Auto-rotating testimonial slider with manual controls and indicator dots.
- **📝 Live Testimonial Submission**: "Write a Review" modal allowing logged-in customers to publish testimonials directly to MongoDB.
- **🔐 Better Auth Profile Modal**: User login/registration with profile dashboard, active online indicator, and quick links.

### 🛡️ Admin Dashboard & Management (`/admin`)
- **📦 Product Management (CRUD)**: Add new tea blends, edit prices, descriptions, and ingredients, or delete existing products.
- **🚚 Live Order Manager**: View customer orders and update status (`Pending` ➔ `Preparing` ➔ `Out for Delivery` ➔ `Delivered`).

### 📦 Customer Order History (`/my-orders`)
- **⏱️ Order Tracking**: View order items, total amounts paid, purchase dates, and real-time status badges.

---

## 📂 Architecture Tree

```
TeaHouse/
├── ANTIGRAVITY.md               # AI Agent Guidelines & Architecture Rules
├── CLAUDE.md                    # Alias AI Rules File
├── DEPLOYMENT.md               # Step-by-Step Vercel & Render Deployment Guide
├── IMPLEMENTATION_PLAN.md      # Full-Stack Architecture Roadmap
├── LICENSE                     # MIT Open Source License
├── README.md                   # Project Documentation
│
├── client/                     # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/                # Pages (/, /products, /my-orders, /admin, /about, /services/*, /faqs, /contact, /not-found)
│   │   ├── components/         # UI Components (Navbar, Hero, FeaturedProducts, SuperClients, AuthModal, WriteReviewModal)
│   │   ├── lib/                # REST Client (api.ts) & Better Auth Client SDK (auth-client.ts)
│   │   └── types/              # Shared TypeScript Interfaces
│   ├── public/images/          # Tea House Image Assets
│   ├── vercel.json             # Vercel Deployment Settings
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── server/                     # Express TypeScript Backend
    ├── src/
    │   ├── config/             # MongoDB Connection (db.ts)
    │   ├── lib/                # Better Auth Server Integration
    │   ├── models/             # Mongoose Schemas (Product, Review, News, Order, User)
    │   ├── routes/             # REST Endpoints (productRoutes, orderRoutes, reviewRoutes, newsRoutes)
    │   ├── index.ts            # Server Entry Point
    │   └── seed.ts             # Database Seeding Script
    ├── render.yaml             # Render Deployment Blueprint
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

---

## 🛠️ Environment Variables Reference

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
NEXT_PUBLIC_API_URL=https://teahouse-s1zl.onrender.com/api
NEXT_PUBLIC_BETTER_AUTH_URL=https://teahouse-s1zl.onrender.com
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/iMoloy/TeaHouse.git
cd TeaHouse

# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Seed Initial Database

```bash
cd server
npm run seed
```

### 3. Start Local Development Servers

```bash
# Run Express Backend Server (Port 5000)
cd server
npm run dev

# Run Next.js Client App (Port 3000)
cd client
npm run dev
```

---

## 🔗 REST API Endpoint Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Server health check endpoint | Public |
| `GET` | `/api/products` | Get all products (supports `?category=` & `?search=`) | Public |
| `GET` | `/api/products/:id` | Get single product details | Public |
| `POST` | `/api/products` | Create new tea product | Admin |
| `PUT` | `/api/products/:id` | Update product details | Admin |
| `DELETE` | `/api/products/:id` | Delete product | Admin |
| `GET` | `/api/reviews` | Get customer testimonials | Public |
| `POST` | `/api/reviews` | Submit new customer review | User |
| `GET` | `/api/news` | Get news articles & brewing guides | Public |
| `POST` | `/api/orders` | Submit new customer order | Public/User |
| `GET` | `/api/orders` | Get all customer orders | Admin |
| `GET` | `/api/orders/user/:email` | Get user order history | User |
| `PATCH` | `/api/orders/:id/status` | Update order status | Admin |

---

## 📜 License & AI Disclaimer

- 🤖 **AI Pair Programmed**: Built autonomously using **Google DeepMind Antigravity AI**.
- 📄 **License**: Released under the open-source [MIT License](./LICENSE).
