# E-commerce Store

A full-stack e-commerce learning project. The frontend is built with Next.js, TypeScript, and CSS Modules; the backend is an Express API backed by PostgreSQL.

This project started as a frontend exercise for routing, dynamic product pages, component structure, React state, and cart management. It now includes a real backend so the cart is persisted in a database instead of only React state.

Live demo: https://ecommerce-store-nine-amber.vercel.app/

<p>
    <img width="48%" alt="Screenshot 2026-05-27 at 5 13 40 PM" src="https://github.com/user-attachments/assets/5c4735db-5d36-4800-8da7-79b35cd355af" />
    <img width="48%" alt="Screenshot 2026-05-27 at 5 14 15 PM" src="https://github.com/user-attachments/assets/3ad25835-075e-4ac1-be34-c28ad8aaf7fb" />
    <img width="48%" alt="Screenshot 2026-05-27 at 5 13 50 PM" src="https://github.com/user-attachments/assets/a2e896a8-4093-46ef-9d65-24ff5d469f43" />
</p>

## Features

- Home page with featured products
- Products listing page
- Dynamic product detail pages
- Cart page
- Add products to cart
- Increase and decrease item quantity
- Remove items from cart
- Clear cart
- Cart total and item count calculated on the server
- Cart persisted in PostgreSQL via an Express REST API
- Products seeded into the database from a JSON file
- Responsive layout using CSS Modules

## Tech Stack

**Frontend**
- Next.js
- TypeScript
- React
- CSS Modules

**Backend**
- Node.js + Express
- PostgreSQL (`pg`)
- CORS
- dotenv

**Deployment**
- Vercel for the Next.js frontend
- Render for the Express API
- Neon for hosted PostgreSQL
- cron-job.org health ping for the backend `/api/health` route

## Project Structure

```txt
.
├── src                         # Next.js frontend
│   ├── app
│   │   ├── page.tsx
│   │   ├── products
│   │   │   ├── page.tsx
│   │   │   └── [id]
│   │   │       └── page.tsx
│   │   ├── cart
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── components
│   │   ├── Navbar.tsx
│   │   ├── AddToCartButton.tsx
│   │   └── CartItems.tsx
│   │
│   ├── context
│   │   └── CartContext.tsx      # talks to the API via NEXT_PUBLIC_API_URL
│   │
│   └── data
│       └── products.json        # source data, seeded into Postgres
│
└── server                      # Express + Postgres backend
    ├── index.js                 # Express app and cart API routes
    ├── db.js                    # Postgres connection pool
    ├── schema.sql               # products + cart_items tables
    ├── seed.js                  # loads products.json into the database
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js
- A PostgreSQL database
  - Local PostgreSQL for local development
  - Neon PostgreSQL for the deployed version

### 1. Backend (API)

From the `server/` folder:

```bash
cd server
npm install
```

Create `server/.env`:

```env
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/ecommerce
```

For the deployed database, use the Neon pooled connection string as `DATABASE_URL` on Render. Do not commit the real connection string.

Create the tables, seed products, and start the API:

```bash
npm run seed   # creates tables and seeds products from ../src/data/products.json
npm run dev    # starts the API on http://localhost:4000
```

> Note: run `npm run seed` from inside the `server/` directory because it reads `schema.sql` and `../src/data/products.json` relative to that folder.

### 2. Frontend (Next.js)

From the project root:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Then start the dev server:

```bash
npm run dev    # http://localhost:3000
```

## Deployment

The app is deployed as a split full-stack project:

- Frontend: Vercel
- Backend API: Render
- Database: Neon PostgreSQL
- Health check: `/api/health`

Production URLs:

- Frontend: https://ecommerce-store-nine-amber.vercel.app
- Backend API: https://ecommerce-store-api-dk85.onrender.com
- Backend health check: https://ecommerce-store-api-dk85.onrender.com/api/health

Production environment variables:

```env
# Vercel
NEXT_PUBLIC_API_URL=https://ecommerce-store-api-dk85.onrender.com

# Render
DATABASE_URL=postgresql://...
```

Render provides the backend port through `process.env.PORT`, and the API falls back to `4000` for local development.

A cron-job.org health check pings `/api/health` every 10 minutes to reduce Render cold starts without waking the Neon database.

## API Reference

Local base URL:

```txt
http://localhost:4000
```

Production base URL:

```txt
https://ecommerce-store-api-dk85.onrender.com
```

| Method   | Endpoint                     | Body            | Description                                    |
| -------- | ---------------------------- | --------------- | ---------------------------------------------- |
| `GET`    | `/api/health`                | —               | Health check, returns `{ status: "ok" }`       |
| `GET`    | `/api/cart`                  | —               | Get cart `items`, `total`, and `count`         |
| `POST`   | `/api/cart/items`            | `{ productId }` | Add a product to the cart, quantity +1         |
| `PATCH`  | `/api/cart/items/:productId` | `{ delta }`     | Change quantity by `delta`, removes item at 0  |
| `DELETE` | `/api/cart/items/:productId` | —               | Remove a product from the cart                 |
| `DELETE` | `/api/cart`                  | —               | Clear the cart                                 |

All cart endpoints return the updated cart:

```json
{
  "items": [],
  "total": 0,
  "count": 0
}
```

## Database Schema

```sql
products (
  id,
  name,
  description,
  price,
  image,
  category,
  stock
)

cart_items (
  product_id  -> references products(id) ON DELETE CASCADE,
  quantity
)
```

## Available Scripts

**Root frontend**

- `npm run dev` — start Next.js in development
- `npm run build` — build for production
- `npm start` — run the production build
- `npm run lint` — run ESLint

**server/ backend**

- `npm run dev` — start the API with `--watch` auto-reload
- `npm start` — start the API
- `npm run seed` — create tables and seed products
