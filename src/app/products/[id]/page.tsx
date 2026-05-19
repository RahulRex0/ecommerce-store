import products from "@/data/products.json"
import { notFound } from "next/navigation"
import styles from "./page.module.css"

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = products.find((product) => product.id === id);

    if (!product) {
      notFound();
    }
    return(
      <div className={styles.container}>
          <div className={styles.title}>
            {product.name}
          </div>
          <div className={styles.description}>
            {product.description}
          </div>
          <div className={styles.price}>
            ₹{product.price}
          </div>
          <div>
            Category: {product.category}
          </div>
          <div>
            Stock:{product.stock}
          </div>
          <button className={styles.button}>Add to Cart</button>
      </div>
        
    )
  }