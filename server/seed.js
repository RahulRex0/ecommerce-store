import fs from "fs"
import path from "path"
import { query, pool } from "./db.js"

async function seed() {
    const schema = fs.readFileSync(path.join(process.cwd(), "schema.sql"), "utf8")
    await query(schema)

    const file = path.join(process.cwd(), "..", "src", "data", "products.json")
    const products = JSON.parse(fs.readFileSync(file, "utf8"))

    for (const p of products) {
        await query(
          `INSERT INTO products (id, name, description, price, image, category, stock)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO UPDATE SET
             name = EXCLUDED.name,
             description = EXCLUDED.description,
             price = EXCLUDED.price,
             image = EXCLUDED.image,
             category = EXCLUDED.category,
             stock = EXCLUDED.stock`,
          [p.id, p.name, p.description, p.price, p.image, p.category, p.stock]
        )
    }
    console.log(`Seeded ${products.length} products`);
    await pool.end();

}
seed();