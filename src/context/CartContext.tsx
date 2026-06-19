"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type Product = {
  id: string;
  name: string;
  price: number;
};

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    clearCart: () => void;
    total: number;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart: CartItem[] = [];

  function addToCart(product: Product) {}

  function removeFromCart(id: string) {}

  function increaseQuantity(id: string) {}

  function decreaseQuantity(id: string) {}

  function clearCart() {}

  const total = 0;

  const cartCount = 0;

  return (
    <CartContext.Provider
    value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
