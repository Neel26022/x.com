import Itweet, { type ITweet } from '../schemas/tweet.js'
import type { Request, Response } from 'express'


const createTweet = (req: Request, res:Response) => {
    const { userId, title } = req.body
    res.send("hello")
}

const showTweet = (req: Request, res: Response) => {
    res.send("Create Tweet")
}

export {
    createTweet,
    showTweet
}