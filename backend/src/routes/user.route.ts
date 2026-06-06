import { Router } from "express";
import { generateAccessToken, login, signup } from "../controllers/user.js"
const userRouter = Router()

userRouter.post('/signup', signup)
userRouter.post('/signin', login)
userRouter.post('/access-token',generateAccessToken)

export default userRouter