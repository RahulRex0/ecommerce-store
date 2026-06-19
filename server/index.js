import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port=4000;

app.get("/api/health", (req,res)=>{
    res.json({status:"ok"});
});

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
});
