import { Router } from "express";
import { createTweet, showTweet } from "../controllers/tweet.js";
import auth from "../middleware/auth.js";
import { createComment } from "../controllers/comment.js";

const tweetRouter = Router()


tweetRouter.get('/',auth,showTweet)

tweetRouter.post("/create-tweeet", auth, createTweet);

tweetRouter.post("/:tweetId/comment", auth, createComment)

export default tweetRouter