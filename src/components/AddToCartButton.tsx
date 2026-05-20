"use client";

import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}