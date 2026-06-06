import { Router } from "express";
import { createTweet, showTweet } from "../controllers/tweet.js";
import auth from "../middleware/auth.js";

const tweetRouter = Router()


tweetRouter.get('/',auth,showTweet)

tweetRouter.post("/create-tweeet", auth, createTweet);

export default tweetRouter