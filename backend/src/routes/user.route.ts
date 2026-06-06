import { Router } from "express";
import { Login, Signup } from "../controllers/user.js"
const userRouter = Router()

userRouter.post('/signup', Signup)
userRouter.post('/signin', Login)

export default userRouter