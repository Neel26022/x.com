import Itweet, { type ITweet } from '../schemas/tweet.js'

const createTweet = (req: Request, res:Response) => {
    const { userId, title } = req.body
    res.send("hello")
}

export {
    createTweet
}