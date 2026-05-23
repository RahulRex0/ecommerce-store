import CartItems from "@/components/CartItems";
import styles from "./page.module.css";

export default function CartPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Cart</h1>
        <CartItems />
      </div>
    </main>
  );
}
