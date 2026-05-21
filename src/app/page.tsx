import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>My E-commerce Store</h1>
      <p>Browse products and add them to your cart.</p>

      <Link href="/products">View Products</Link>
    </main>
  );
}