import express from "express"
import 'dotenv/config'
import connectDB from "./connectDB.js"
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import tweetRouter from "./routes/tweets.route.js"
import router from "./routes/index.js"


const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/api', router)

const PORT = process.env.PORT
connectDB()


app.listen(PORT, () => {
    console.log("Server started at: ",PORT)
})