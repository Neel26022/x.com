import { Router } from "express";
import { generateAccessToken, login, signup } from "../controllers/user.js"
import auth from "../middleware/auth.js";
import { removeBookMark, setBookMark, showBookMark } from "../controllers/bookmark.js";
const userRouter = Router()

userRouter.post('/signup', signup)

userRouter.post('/signin', login)

userRouter.post('/access-token',generateAccessToken)

userRouter.get('/book-mark', auth, showBookMark)

userRouter.post('/:tweetId/book-mark',auth, setBookMark)

userRouter.delete('/:tweetId/book-mark',auth, removeBookMark)

export default userRouter