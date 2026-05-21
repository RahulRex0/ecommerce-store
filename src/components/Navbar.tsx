"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar(){

    const { cartCount } = useCart();
    return(
        <nav className={styles.container}>
            <Link href="/" style={{marginLeft: "220px"}} className={styles.containerleft}>Home</Link>
            <Link href="/products" className={styles.containerleft}>Products</Link>
            <Link href="/cart" className={styles.containerright}>Cart ({cartCount})</Link>
        </nav>
    )
}