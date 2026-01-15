import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import router from "./routes/userRoutes.js"




dotenv.config()


const app =express()
app.use(express.json())
app.use("/api/v1",router)


const port=process.env.PORT || 3000
const db=process.env.DATABASE


app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

mongoose.connect(db).then(()=>{console.log("database connected")})
.catch((error)=>{console.log(`Error is ${error}`)})