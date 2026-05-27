# E-commerce Store

A e-commerce learning project built with Next.js, TypeScript, and CSS Modules.

This project is focused on learning core frontend concepts such as routing, dynamic product pages, component structure, React state, and cart management
live demo: https://ecommerce-store-nine-amber.vercel.app/

<p>
    <img width="48%" alt="Screenshot 2026-05-27 at 5 13 40 PM" src="https://github.com/user-attachments/assets/5c4735db-5d36-4800-8da7-79b35cd355af" />
    <img width="48%" alt="Screenshot 2026-05-27 at 5 14 15 PM" src="https://github.com/user-attachments/assets/3ad25835-075e-4ac1-be34-c28ad8aaf7fb" />
    <img width="48%" alt="Screenshot 2026-05-27 at 5 13 50 PM" src="https://github.com/user-attachments/assets/a2e896a8-4093-46ef-9d65-24ff5d469f43" />
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
- Cart total calculation
- Product data loaded from a local JSON file
- Responsive layout using CSS Modules

## Tech Stack

- Next.js
- TypeScript
- React
- CSS Modules
- JSON data

## Project Structure

```txt
src
├── app
│   ├── page.tsx
│   ├── products
│   │   ├── page.tsx
│   │   └── [id]
│   │       └── page.tsx
│   ├── cart
│   │   └── page.tsx
│   └── layout.tsx
│
├── components
│   ├── Navbar.tsx
│   ├── AddToCartButton.tsx
│   └── CartItems.tsx
│
├── context
│   └── CartContext.tsx
│
└── data
    └── products.json
