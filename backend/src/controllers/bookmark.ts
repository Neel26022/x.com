import BookMark from "../schemas/bookmark.js"
import type {Request, Response} from 'express'
const setBookMark = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId
    const userId = req.user['userId']

    try {

        if(!tweetId || !userId) {
            res.status(400).json({
                message: "Cannot find the userId or tweetId"
            })
        }

        const bookmark = await BookMark.create({
            userId: userId,
            tweetId: tweetId
        })

        if(!bookmark) {
            return res.status(400).json({
                message: "tweet is not bookmarked"
            })
        }

        res.status(200).json({
            message: "tweet is bookmarked",
            data: bookmark
        })

    } catch (e) {
        console.error(e)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const showBookMark = async (req:Request, res: Response) => {
    const userId = req.user['userId']

    try {
        const tweets = await BookMark.find({
            userId: userId
        })

        if(!tweets) {
            return res.status(400).json({
                message: "not find any tweets that have a bookmark"
            })
        }

        res.status(200).json({
            message: "find bookmark tweets",
            data: tweets
        })
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const removeBookMark = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId
    const userId = req.user["userId"]

    try {
        if(!tweetId || !userId) {
            return res.status(400).json({
                message: "userId or tweetId is not find"
            })
        }

        const removeBookMark = await BookMark.deleteOne({
            userId: userId,
            tweetId: tweetId
        })

        if(!removeBookMark) {
            return res.status(400).json({
                message: "not remove the book mark on tweet"
            })
        }

        res.status(200).json({
            message: "successfully remove book mark",
            data: removeBookMark
        })

    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export {
    setBookMark,
    showBookMark,
    removeBookMark
}