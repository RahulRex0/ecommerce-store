import Link from "next/link";
import styles from "@/app/page.module.css"
import products from "@/data/products.json"
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <div className={styles.Fresh}>
          Fresh picks for everyday style
          </div>
          <div className={styles.textHeading}>My E-commerce Store</div>
          <div className={styles.text}>Browse clean, practical essentials with simple pricing, quick product previews, and a cart built for easy shopping.</div>
          <div className={styles.buttonGroup}>
            <Link href="/products" style={{background:"#185b52",
            color: "#fffdf8",border: "#185b52"}}>Shop Products</Link>
            <Link href="/cart" style={{background: "#fffdf8",
            color: "#1f2520",
            border: "#cfd8d2"}}>View Cart</Link>
          </div>
        </div>
        <div className={styles.productGrid}>
          {products.slice(0, 3).map((product, index) => (
              <Link 
                key={product.id} 
                href={`/products/${product.id}`}
                className={index === 0 ? styles.featuredProduct : styles.productCard}
                aria-label={`View ${product.name}`}
              >
                <Image
                  src={product.image}
                  alt={product.name} 
                  width={400} 
                  height={400} 
                  className={styles.productImage}
                />
                <div  className={styles.productName}>{product.name}</div>
              </Link>
            ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomCard}>
          <div className={styles.bottomCardTitle}>
            4
          </div>
          <div className={styles.bottomCardText}>
            Curated products
          </div>
        </div>
        <div className={styles.bottomCard}>
          <div className={styles.bottomCardTitle}>
            Fast
          </div>
          <div className={styles.bottomCardText}>
            Simple cart flow
          </div>
        </div>
        <div className={styles.bottomCard}>
          <div className={styles.bottomCardTitle}>
            Fresh
          </div>
          <div className={styles.bottomCardText}>
            Clean responsive layout
          </div>
        </div>
      </div>
    </main>
  );
}
