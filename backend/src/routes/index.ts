import { Router } from "express";
import tweetRouter from "./tweets.route.js";
import userRouter from "./user.route.js";

const router = Router()


router.use('/', tweetRouter)


export default router