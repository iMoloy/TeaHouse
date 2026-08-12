# 🍵 Full-Stack Implementation Plan - Tea House (Next.js, Express, MongoDB, TypeScript, Better Auth)

Transform the Tea House project into a **100% Dynamic Full-Stack MERN Architecture** built with:
- **Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS, DaisyUI, Lucide/FontAwesome.
- **Backend**: Node.js, Express.js, TypeScript, Mongoose (MongoDB).
- **Authentication**: Better Auth (Email/Password, Session Management, Protected API routes).
- **Database**: MongoDB database with schemas for Products, Reviews, News, Orders, and Users.
- **Execution Strategy**: Section-by-section implementation where each section is completed, tested, committed, and pushed to GitHub before moving to the next.

---

## 🎯 Architectural Overview

```
TeaHouse/
├── client/                  # Next.js 15 (App Router) + TypeScript + React
│   ├── src/
│   │   ├── app/             # Pages & Layouts (Home, Products, Cart, Auth)
│   │   ├── components/      # UI Sections (Navbar, Hero, ProductGrid, Carousel, Modals)
│   │   ├── lib/             # API Client & Better Auth Client Helper
│   │   └── types/           # Shared TypeScript Interfaces
│   └── package.json
└── server/                  # Express + TypeScript + MongoDB + Better Auth
    ├── src/
    │   ├── config/          # Database Connection (db.ts) & Environment Variables
    │   ├── models/          # Mongoose Schemas (User, Product, Review, News, Order)
    │   ├── routes/          # REST API Routes (/api/auth, /api/products, /api/reviews, etc.)
    │   ├── controllers/     # Business Logic Handlers
    │   └── middlewares/     # Auth & Error Handling Middlewares
    └── package.json
```

---

## 🚀 Section-by-Section Workflow & Roadmap

### **Phase 1: Server Setup, MongoDB Database & Better Auth (Backend Foundation)**
- Initialize TypeScript Express server in `server/`.
- Connect MongoDB with Mongoose (`server/src/config/db.ts`).
- Create Mongoose models (`Product`, `Review`, `News`, `Order`, `User`).
- Configure Better Auth for TypeScript Express server.
- Seed database with initial tea products, client reviews, and news stories.
- **Git Milestone**: `git add . && git commit -m "feat(server): setup Express, MongoDB, Better Auth & seed endpoints" && git push origin main`

---

### **Phase 2: Next.js App Router Client Foundation & UI Shell**
- Initialize Next.js 15 App Router project in `client/` with TypeScript & Tailwind CSS.
- Build responsive `Navbar` (with cart counter, auth status badge, mobile dropdown) and `Footer`.
- Integrate Better Auth client SDK for authentication state management.
- **Git Milestone**: `git add . && git commit -m "feat(client): initialize Next.js client, Tailwind, Navbar and Layout" && git push origin main`

---

### **Phase 3: Dynamic Hero & Featured Products Section (API + React Components)**
- Express API: `GET /api/products`, `GET /api/products/:id`, `GET /api/products/category/:category`.
- React Components: `Hero.tsx`, `FeaturedProducts.tsx`, `CategoryFilters.tsx`, `LiveSearch.tsx`.
- Connect frontend to MongoDB API using SWR/Fetch.
- Add **Product Quick View Modal** with quantity controls and dynamic price calculator.
- **Git Milestone**: `git add . && git commit -m "feat(products): complete dynamic products grid, filters, search and modal" && git push origin main`

---

### **Phase 4: Dynamic Great Tea Section & Client Testimonials Section**
- Express API: `GET /api/reviews` & `POST /api/reviews` (for authenticated user reviews).
- React Components: `FreshQuality.tsx`, `SuperClientsCarousel.tsx`.
- Auto-rotating carousel with manual Prev/Next controls and live MongoDB data.
- **Git Milestone**: `git add . && git commit -m "feat(reviews): build fresh tea grid and dynamic testimonials carousel" && git push origin main`

---

### **Phase 5: Dynamic News & Events Section & Newsletter System**
- Express API: `GET /api/news`, `POST /api/newsletter/subscribe`.
- React Components: `NewsGrid.tsx`, `NewsModal.tsx`, `NewsletterForm.tsx`.
- Interactive news modal reader and animated toast feedback.
- **Git Milestone**: `git add . && git commit -m "feat(news): implement dynamic news section, reader modal and newsletter" && git push origin main`

---

### **Phase 6: Better Auth User Sign In / Registration & Cart Checkout Workflow**
- Express API: `POST /api/orders` (Protected route requiring Better Auth session).
- React Components: `AuthModal.tsx` (Login & Register tabs), `CartDrawer.tsx`, `CheckoutModal.tsx`.
- Enable full order placement, order history, and toast notifications.
- **Git Milestone**: `git add . && git commit -m "feat(auth-cart): complete Better Auth integration, shopping cart and checkout flow" && git push origin main`

---

## 🧪 Verification Plan

### Automated Verification
- Run `npm run build` on both `server` and `client` to verify zero TypeScript or linting errors.
- Test REST API routes using Curl / Fetch scripts to ensure MongoDB operations respond correctly.

### Manual Verification
- Test registration/login using Better Auth.
- Verify real-time product search and category filtering driven by MongoDB queries.
- Verify shopping cart persistence and order creation in MongoDB.
- Verify section-by-section Git commit and push logs on GitHub repository.
