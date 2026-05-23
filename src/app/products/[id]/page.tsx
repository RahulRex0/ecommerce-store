import products from "@/data/products.json"
import { notFound } from "next/navigation"
import styles from "./page.module.css"
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import Image from "next/image";

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
      <main className={styles.page}>
        <Link href="/products" className={styles.back} >
          Back to Products
        </Link>
        <div className={styles.container}>
          <div className={styles.imageFrame}>
            <Image src={product.image} alt={product.name} width={500} height={500} className={styles.image}></Image>
          </div>
          <div className={styles.containerLeft}>
            <div className={styles.title}>
              <div className={styles.name}>
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
              <div className={styles.buttonContainer}>
              <AddToCartButton product={product} className={styles.button}/>
                <Link 
                  href="/cart" 
                  className={styles.button} 
                  style={{ backgroundColor: "#fff", color: "black", border: "1px solid #ccc" }}
                >
                  Cart
                </Link>
              </div>
              </div>
            </div>
        </div>
      </main>
        
    )
  }
