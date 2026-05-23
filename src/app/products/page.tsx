import styles from "./page.module.css"
import Image from "next/image"
import products from "@/data/products.json"
import Link from "next/link"


export default function ProductPage(){
    return(
        <main className={styles.main}>
        
            <div className={styles.heading}>
                <div className={styles.shop}>
                    Shop the collection
                </div>
                <div className={styles.product}>
                    Products
                </div>
                <div className={styles.text}>
                    Pick from a compact catalog of daily essentials.
                </div>
            </div>
            <div className={styles.catalog}>
                {products.map((products)=>(
                    <Link
                         key={products.id}
                         href={`/products/${products.id}`}
                         className={styles.card}
                    >
                        <div>
                            <div>
                                <Image src={products.image} alt={products.name}
                                className={styles.image}
                                width={1000}
                                height={400}
                                />
                            </div>
                            <div className={styles.title}>
                                {products.name}
                            </div>
                            <div>
                                {products.description}
                            </div>
                            <div className={styles.price}>
                                ₹{products.price}
                            </div>
                        </div>

                    </Link>
                    

                ))}
             
              

            </div>
        </main>
    )
}