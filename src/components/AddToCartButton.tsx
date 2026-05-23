"use client";

import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  product: Product;
  className?: string;
};

export default function AddToCartButton({ product, className }: Props) {
  const { addToCart } = useCart();

  return (
    <button className={className} onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}