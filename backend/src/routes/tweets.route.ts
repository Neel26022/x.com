import { Router } from "express";
import { createTweet, deleteTweet, showOwnTweet, showTweet } from "../controllers/tweet.js";
import auth from "../middleware/auth.js";
import { createComment, showComment } from "../controllers/comment.js";
import { createReplay, showReplay } from "../controllers/replay.js";

const tweetRouter = Router()


tweetRouter.get('/',auth,showTweet)

tweetRouter.post("/create-tweeet", auth, createTweet);

tweetRouter.post("/:tweetId/comment", auth, createComment)

tweetRouter.get("/:tweetId/comment",auth, showComment)

tweetRouter.get("/:tweetId/replay", auth, showReplay)

tweetRouter.post("/:tweetId/:commentId/replay",auth, createReplay)

tweetRouter.get('/own-tweet', auth, showOwnTweet)

tweetRouter.delete('/tweet-delete', auth, deleteTweet)

export default tweetRouter