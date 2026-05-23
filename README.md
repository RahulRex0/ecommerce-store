# E-commerce Store

A simple e-commerce learning project built with Next.js, TypeScript, and CSS Modules.

This project is focused on learning core frontend concepts such as routing, dynamic product pages, component structure, React state, and cart management

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

<img width="1710" height="1073" alt="Screenshot 2026-05-23 at 2 26 06 PM" src="https://github.com/user-attachments/assets/c7bd781f-7588-4ea8-b917-99f8e8c36cf2" />



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
