import express from "express";
import mongoose from "mongoose";



const app = express();


mongoose.connect(
    "mongodb+srv://admin:nD8dt64B20xlG0k6@cluster0.r2aztl7.mongodb.net/?retryWrites=true&w=majority"
)
.then(()=>app.listen(5000))
.then(()=>console.log("connected to database & listening to port 5000"))
.catch((err)=>console.log(err))