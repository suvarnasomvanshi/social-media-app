import express from "express";

const app = express();

app.use("/api",(req,res,next)=>{
    res.send("hell world")
})

app.listen(5000)