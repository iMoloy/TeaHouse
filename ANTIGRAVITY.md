# 🤖 ANTIGRAVITY.md - AI Assistant Guidelines & Project Blueprint

This document serves as the authoritative blueprint, architectural history, and coding guide for AI assistants (Google DeepMind Antigravity AI, Claude, etc.) working on the **Tea House** full-stack web application.

---

## 🚀 Project Implementation History & Execution Roadmap

The **Tea House** project was transformed from an initial static HTML/CSS landing page assignment from **Programming Hero** into a production-ready, fully dynamic **Full-Stack MERN Application**.

### 📌 Implementation Milestones:

1. **Phase 1: Full-Stack MERN Architecture Setup**
   - Initialized a **Next.js 15 (App Router)** client with React 19, TypeScript, and Tailwind CSS.
   - Built a modular **Express.js (TypeScript)** REST API server backed by **MongoDB Atlas & Mongoose ODM**.
   - Configured **Better Auth (v1.1)** for user session and authentication management.

2. **Phase 2: Database Schemas & REST APIs**
   - Created Mongoose schemas for `Product`, `Review`, `News`, `Order`, and `User`.
   - Developed 13+ REST endpoints covering CRUD operations, category filtering, search, and user order history.

3. **Phase 3: E-Commerce UI & Modals**
   - Built interactive shopping cart drawer (`CartDrawer.tsx`) with instant quantity updates and checkout.
   - Implemented quick view modal (`ProductModal.tsx`), wishlist favorites system (`❤️ Favorites`), and authentication modal (`AuthModal.tsx`).
   - Integrated `React-Toastify` notifications and custom glassmorphic `LoadingSpinner.tsx`.

4. **Phase 4: Admin Dashboard & Order Tracking System**
   - Developed **Admin Panel (`/admin`)** allowing real-time product CRUD (Create, Edit, Delete) and order status management (`Pending` ➔ `Preparing` ➔ `Out for Delivery` ➔ `Delivered`).
   - Created **Customer Order History (`/my-orders`)** with real-time status badges and email search capabilities.
   - Added **Write Review Modal (`WriteReviewModal.tsx`)** enabling customers to submit testimonials directly to MongoDB.

5. **Phase 5: Modal Consistency & Order Persistence Fixes**
   - Integrated `CartDrawer` and `AuthModal` across all 15 app routes (`/`, `/about`, `/products`, `/my-orders`, `/admin`, `/faqs`, `/contact`, `/privacy-policy`, `/services/*`).
   - Implemented **hybrid order persistence** (MongoDB Atlas + `localStorage` fallback sync) ensuring orders appear instantly and reliably under `My Orders` and `Admin Panel`.

6. **Phase 6: Cloud Deployment & CI/CD**
   - Deployed Next.js frontend to **Vercel** with custom alias domain: `https://teahouse-client.vercel.app`.
   - Deployed Express backend server to **Render** with CORS validation: `https://teahouse-s1zl.onrender.com`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 15.1 (App Router), React 19.0, TypeScript 5.7 |
| **Styling & Icons** | Tailwind CSS 3.4, DaisyUI 5.0, Lucide React Icons |
| **Backend Framework** | Node.js, Express.js 4.21, TypeScript 5.7 |
| **Database & ODM** | MongoDB 8.10, Mongoose ODM |
| **Authentication** | Better Auth 1.1 (Email/Password, Session Management) |
| **Notifications & Loaders** | React-Toastify, Custom Glassmorphic LoadingSpinner & Skeleton Loaders |

---

## 📂 Architecture Overview

```
TeaHouse/
├── ANTIGRAVITY.md               # AI Agent Guidelines & Project Blueprint
├── CLAUDE.md                    # Alias AI Rules File
├── IMPLEMENTATION_PLAN.md      # Detailed Step-by-Step Execution Plan
├── LICENSE                     # MIT License
├── README.md                   # Project Documentation & Badges
│
├── client/                     # Next.js 15 App Router Frontend
│   ├── src/
│   │   ├── app/                # Pages (/, /about, /products, /privacy-policy, /services/*, /faqs, /contact, /not-found, /admin, /my-orders)
│   │   ├── components/         # Modular Components (Navbar, Hero, Products, Carousel, Modals, LoadingSpinner, Footer)
│   │   ├── lib/                # REST Client (api.ts) & Better Auth Client (auth-client.ts)
│   │   └── types/              # TypeScript Interfaces (Product, Review, News, CartItem)
│   ├── public/images/          # Tea House Assets
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── server/                     # Express TypeScript Backend
    ├── src/
    │   ├── config/             # MongoDB Mongoose Connection (db.ts)
    │   ├── lib/                # Better Auth Server Setup (auth.ts)
    │   ├── models/             # Mongoose Models (Product, Review, News, Order, User)
    │   ├── routes/             # REST Endpoints (/api/products, /api/reviews, /api/news, /api/orders)
    │   ├── index.ts            # Server Entry Point
    │   └── seed.ts             # Database Seeding Script
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

---

## 📜 Coding Conventions & Guidelines

1. **Strict TypeScript Types**:
   - Never use `any` when defining API responses or component props.
   - Centralize all frontend models in `client/src/types/index.ts`.

2. **UI & Styling Guidelines**:
   - Use standard `className` instead of `class` in JSX/TSX.
   - Maintain the brand palette (`#FF8938` orange gradient, glassmorphism badges, rounded-3xl cards).
   - Use Lucide icons consistently across components.

3. **Data Fetching & State**:
   - Display `LoadingSpinner` or `ProductSkeletonGrid` whenever fetching data asynchronously.
   - Use `react-toastify` (`toast.success`, `toast.info`, `toast.warn`, `toast.error`) for interactive user feedback.

4. **Git & Commit Strategy**:
   - Always verify `.gitignore` excludes `node_modules/`, `.next/`, `dist/`, and `.env` files.
   - Keep commits modular with clean Conventional Commit prefixes (`feat`, `fix`, `docs`, `refactor`).

---

## 💻 Development & Build Commands

```bash
# Start Express Backend Server (Port 5000)
cd server
npm run dev

# Start Next.js Frontend App (Port 3000)
cd client
npm run dev

# Seed MongoDB Database
cd server
npm run seed

# Production Builds
cd server && npm run build
cd client && npm run build
```
