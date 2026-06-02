import express from "express"
import 'dotenv/config'
import connectDB from "./db.js"


const app = express()



const PORT = process.env.PORT
connectDB()



app.listen(PORT, () => {
    console.log("Server started at: ",PORT)
})