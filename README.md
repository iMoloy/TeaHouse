# 🍵 The Tea House - Full-Stack E-Commerce & Landing Page

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.10-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Better--Auth-1.1-orange)](https://better-auth.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A modern, 100% dynamic, full-stack tea shop landing page and e-commerce application built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Express.js**, **MongoDB (Mongoose)**, and **Better Auth**.

---

## ✨ Features

- **🍵 Dynamic Product Catalog**: Browse organic teas dynamically fetched from MongoDB database.
- **🔍 Real-Time Search & Category Filters**: Instant filtering by Milk Tea, Black Tea, Lemon Tea, Green Tea, or live search query.
- **👁️ Product Quick View Modal**: Modal popup with detailed ingredients, star ratings, price calculation, and quantity controls (`+`/`-`).
- **🛒 Shopping Cart Drawer**: Interactive side-cart drawer with badge counter, item deletion, subtotal calculations, and checkout.
- **⭐ Super Clients Carousel**: Auto-rotating testimonial slider with manual controls and indicator dots.
- **📰 News & Articles Modal**: Dynamic news grid featuring brewing guides and eco-friendly announcements with full-article reader modal.
- **🔐 Better Auth Authentication**: User registration and login modal with session management.
- **🔔 Toast Notification System**: Animated feedback for cart additions, email validation, and checkout completion.

---

## 📂 Project Architecture

```
TeaHouse/
├── client/                     # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/                # App Router Layout & Home Page
│   │   ├── components/         # React UI Components (Navbar, Hero, Products, Carousel, Modals)
│   │   ├── lib/                # REST API Client & Better Auth Client SDK
│   │   └── types/              # TypeScript Interfaces
│   ├── public/images/          # High-resolution Tea House assets
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
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

---

## 🛠️ Environment Variables Setup

Create a `.env` file in the root and in `server/` based on `.env.example`:

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

## 🚀 Getting Started

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

### 2. Seed Database (Optional)

```bash
cd server
npm run seed
```

### 3. Run Development Servers

**Run Express Backend Server:**
```bash
cd server
npm run dev
# Server running at http://localhost:5000
```

**Run Next.js Client Application:**
```bash
cd client
npm run dev
# App running at http://localhost:3000
```

---

## 🔗 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Get all products (supports `?category=` & `?search=`) |
| `GET` | `/api/products/:id` | Get single product by ID |
| `GET` | `/api/reviews` | Get all client testimonials |
| `POST` | `/api/reviews` | Submit new client review |
| `GET` | `/api/news` | Get news stories & articles |
| `POST` | `/api/orders` | Place a new cart order |
| `ALL` | `/api/auth/*` | Better Auth authentication endpoints |

---

## 📜 License

This project is licensed under the MIT License.
