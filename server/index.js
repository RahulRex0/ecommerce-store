import express from "express"
import cors from "cors"
import { query } from "./db.js"

const app = express()

app.use(cors())
app.use(express.json())

const port=4000;

const wrap = (fn) => (req,res)=> fn(req,res).catch((err)=>{
    console.error(err)
    res.status(500).json({error:"internal error"})
})

app.get("/api/health", (req,res)=>{
    res.json({status:"ok"})
})

async function getCart() {
    const result= await query(`select p.id,p.name,p.price,c.quantity
        from cart_items c join products p on p.id = c.product_id order by p.id`)
    const items= result.rows
    const total = items.reduce((sum,item)=> sum+ item.price * item.quantity,0)
    const count = items.reduce((sum,item)=>sum+ item.quantity,0)
    return{items, total, count}
}

app.get("/api/cart", wrap(async(req,res)=>{
    res.json(await getCart())
}))

app.post("/api/cart/items", wrap(async(req,res)=>{
    const {productId}= req.body
    await query(`insert into cart_items (product_id, quantity)
        values($1,1)
        on conflict (product_id) do update set quantity = cart_items.quantity + 1 `,
        [productId]
    )
    res.json(await getCart())
}))

app.patch("/api/cart/items/:productId", wrap(async(req,res)=>{
    const {productId}= req.params
    const {delta}= req.body

    await query(`update cart_items set quantity = quantity + $1 where product_id = $2`,
        [delta, productId]
    )
    await query(`delete from cart_items where quantity <= 0`)

    res.json(await getCart())
}))

app.delete("/api/cart/items/:productId", wrap(async(req,res)=>{
    const {productId}= req.params

    await query(`delete from cart_items where product_id = $1`, [productId])

    res.json(await getCart())
}))

app.delete("/api/cart", wrap(async(req,res)=>{
    await query(`delete from cart_items`)
    res.json(await getCart())
}))

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})
