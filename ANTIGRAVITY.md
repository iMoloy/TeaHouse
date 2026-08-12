# 🤖 ANTIGRAVITY.md - AI Assistant Guidelines & Project Blueprint

This document serves as the authoritative blueprint and coding guide for AI assistants (Google DeepMind Antigravity AI, Claude, etc.) working on the **Tea House** full-stack web application.

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
├── ANTIGRAVITY.md               # AI Agent Guidelines & Architecture Rules
├── CLAUDE.md                    # Alias AI Rules File
├── IMPLEMENTATION_PLAN.md      # Detailed Step-by-Step Execution Plan
├── LICENSE                     # MIT License
├── README.md                   # Project Documentation & Badges
│
├── client/                     # Next.js 15 App Router Frontend
│   ├── src/
│   │   ├── app/                # Pages (/, /about, /products, /privacy-policy, /services/*, /faqs, /contact, /not-found)
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
   - Use `react-toastify` (`toast.success`, `toast.info`, `toast.warn`, `toast.error`) for all interactive actions (cart additions, quantity changes, removals, checkout, filter tab clicks, newsletter, auth).

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
