import { Router } from "express";
import { createTweet } from "../controllers/tweet.js";
import auth from "../middleware/auth.js";

const tweetRouter = Router()


tweetRouter.get('/', (req, res) => {
    
})

tweetRouter.post("/", auth, createTweet);

export default tweetRouter