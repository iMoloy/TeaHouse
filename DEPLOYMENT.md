# 🚀 Deployment Guide - Vercel & Render (Tea House Full-Stack)

This guide provides step-by-step instructions for deploying the **Tea House** full-stack web application to **Render.com** (Express Backend & MongoDB) and **Vercel.com** (Next.js 15 Frontend).

---

## 🛠️ Environment Variables Matrix

| Variable Name | Component | Location | Production Example Value |
| :--- | :--- | :--- | :--- |
| `PORT` | Server | Render | `5000` |
| `MONGO_URI` | Server | Render | `mongodb+srv://<user>:<pass>@cluster.mongodb.net/teahouse` |
| `BETTER_AUTH_SECRET` | Server | Render | `teahouse_production_secret_key_32_chars` |
| `BETTER_AUTH_URL` | Server | Render | `https://teahouse-server.onrender.com` |
| `CLIENT_URL` | Server | Render | `https://teahouse-client.vercel.app` |
| `NEXT_PUBLIC_API_URL` | Client | Vercel | `https://teahouse-server.onrender.com/api` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Client | Vercel | `https://teahouse-server.onrender.com` |

---

## 🌩️ Step 1: Deploy Backend Server to Render.com

1. **Sign Up / Log In** to [Render.com](https://render.com/).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository `iMoloy/TeaHouse`.
4. Fill out the service settings:
   - **Name**: `teahouse-server`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Region**: `Singapore` (or nearest region)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add the following keys:
   - `PORT`: `5000`
   - `MONGO_URI`: Your MongoDB Atlas connection string (`mongodb+srv://...`)
   - `BETTER_AUTH_SECRET`: A secure 32-character random string
   - `BETTER_AUTH_URL`: `https://teahouse-server.onrender.com` (Replace with your actual Render URL)
   - `CLIENT_URL`: `https://teahouse-client.vercel.app` (Replace with your actual Vercel URL)
6. Click **Create Web Service**. Once deployed, copy your Render server URL (e.g., `https://teahouse-server.onrender.com`).

---

## 📐 Step 2: Deploy Frontend Client to Vercel.com

1. **Sign Up / Log In** to [Vercel.com](https://vercel.com/).
2. Click **Add New...** > **Project**.
3. Import your GitHub repository `iMoloy/TeaHouse`.
4. Configure the Project Settings:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click **Edit** and select `client`
5. Expand the **Environment Variables** section and add:
   - `NEXT_PUBLIC_API_URL`: `https://teahouse-server.onrender.com/api`
   - `NEXT_PUBLIC_BETTER_AUTH_URL`: `https://teahouse-server.onrender.com`
6. Click **Deploy**. Vercel will build and publish your Next.js application!

---

## 🔄 Step 3: Seed Production Database (Optional)

To seed initial tea products and reviews into your live MongoDB Atlas database:

```bash
cd server
# Update server/.env with your production MONGO_URI
npm run seed
```

---

## ✅ Deployment Checklist

- [x] Express backend built with 0 errors (`npm run build` in `server`).
- [x] Next.js frontend built with 0 errors (`npm run build` in `client`).
- [x] Render configuration saved in [`server/render.yaml`](file:///mnt/File/Work/PH%20Projects/TeaHouse/server/render.yaml).
- [x] Vercel configuration saved in [`client/vercel.json`](file:///mnt/File/Work/PH%20Projects/TeaHouse/client/vercel.json).
- [x] CORS allowed origin configured to accept Vercel client requests.
