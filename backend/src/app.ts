import express from "express"
import 'dotenv/config'
import connectDB from "./connectDB.js"
import router from "./routes/index.js"
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"


const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/',router)
router.use('/user', userRouter)

const PORT = process.env.PORT
connectDB()


app.listen(PORT, () => {
    console.log("Server started at: ",PORT)
})