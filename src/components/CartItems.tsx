"use client";

import { useCart } from "@/context/CartContext";
import styles from "./CartItems.module.css";

export default function CartItems() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
  } = useCart();

  if (cart.length === 0) {
    return <p className={styles.empty}>Your cart is empty.</p>;
  }

  return (
    <div className={styles.container}>
      {cart.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.details}>
            <h2>{item.name}</h2>
            <p>Price: ₹{item.price}</p>
          </div>

          <div className={styles.quantityControls}>
            <button
              type="button"
              aria-label={`Decrease ${item.name} quantity`}
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              type="button"
              aria-label={`Increase ${item.name} quantity`}
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </button>
          </div>

          <p className={styles.subtotal}>Subtotal: ₹{item.price * item.quantity}</p>

          <button
            type="button"
            className={styles.removeButton}
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className={styles.summary}>
        <h2 className={styles.total}>Total: ₹{total}</h2>
        <button type="button" className={styles.clearButton} onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
