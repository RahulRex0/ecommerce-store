"use client";

import { useCart } from "@/context/CartContext";
import styles from "./CartItems.module.css";

export default function CartItems() {
  const { cart, total, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className={styles.container}>
      {cart.map((item) => (
        <div key={item.id} className={styles.item}>
          <h2>{item.name}</h2>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: ₹{item.price * item.quantity}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2 className={styles.total}>Total: ₹{total}</h2>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}