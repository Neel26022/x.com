import type { Request, Response } from "express"
import Replay from "../schemas/replay.js"

const createReplay = async (req:Request, res:Response) => {
    const { text } = req.body

    const tweetId = req.params.tweetID
    const commentId = req.params.commentId
    const userId = req.user['userId']
    try {
        if(!text) {
            return res.status(400).json({
                message: "input filde is required"
            })
        }

        if(!commentId || !tweetId) {
            return res.status(400).json({
                message: "commentId and teetId is not find from url"
            })
        }

        const replay = await Replay.create({
            tweetId: tweetId,
            commentId: commentId,
            userId: userId,
            text: text
        })

        if(!replay) {
            return res.status(400).json({
                message: "replay is not created"
            })
        }

        res.status(200).json({
            message: "Replay is created",
            data: replay
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

const showReplay = async (req:Request, res: Response) => {

    const tweetId = req.params.tweeetId

    try {
        if(!tweetId) {
            return res.status(400).json({
                message: "CommentId is not find"
            })
        }

        const replays = await Replay.find({
            tweetId: tweetId
        })

        if(!replays) {
            return res.status(400).json({
                message: "replays not find"
            })
        }

        res.status(200).json({
            message: "Replay is find",
            data: replays
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            message: "Internale Server Error"
        })
    }
}

export {
    showReplay,
    createReplay
}