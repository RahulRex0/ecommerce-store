"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
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

type Cart = {
  items: CartItem[];
  total: number;
  count: number;
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

const API = process.env.NEXT_PUBLIC_API_URL;

export function CartProvider({ children }: { children: ReactNode }) {

  const [cart, setCart] = useState<Cart>({ items: [], total: 0, count: 0 });

  useEffect(() => {
    fetch(`${API}/api/cart`)
      .then((res) => res.json())
      .then((data: Cart) => setCart(data))
      .catch((error) => console.error("Failed to load cart:", error));
  }, []);

  async function addToCart(product: Product) {

    const res = await fetch(`${API}/api/cart/items`,{
      method:"post",
      headers:{"content-type":"application/json" },
      body: JSON.stringify({productId: product.id})
    })
    setCart(await res.json());
  }

  async function changeQuantity(id: string, delta: number) {
    const res = await fetch(`${API}/api/cart/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delta }),
    });
    setCart(await res.json());
  }

  function increaseQuantity(id: string) {
    changeQuantity(id, 1);
  }

  function decreaseQuantity(id: string) {
    changeQuantity(id, -1);
  }

  async function removeFromCart(id: string) {
    const res = await fetch(`${API}/api/cart/items/${id}`, { method: "DELETE" });
    setCart(await res.json());
  }

  async function clearCart() {
    const res = await fetch(`${API}/api/cart`, { method: "DELETE" });
    setCart(await res.json());
  }

  return (
    <CartContext.Provider
      value={{
        cart: cart.items,     
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total: cart.total,
        cartCount: cart.count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }

  return context
}
