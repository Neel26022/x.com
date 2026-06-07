import type { Request, Response} from "express"
import Tweet from "../schemas/tweet.js"
import Comment from "../schemas/comment.js"
 
const createComment = async (req:Request,res:Response) => {
    
    console.log("ffff",req.user['userId'])
    const userId = req.user['userId']
    const tweetId = req.params.tweetId
    const { message } = req.body
    try {

        if(!tweetId) {
            return res.status(400).json({
                message: "TweetId cannot finde"
            })
        }

        const comment = await Comment.create({
            userId: userId,
            tweetId: tweetId,
            message: message
        })
    
        if(!comment) {
            return res.status(400).json({
                message: "Comment cannot create"
            })
        }

        res.status(201).json({
            message: "Comment created successfully",
            data: comment
        })
    }
    catch (err) {   
        console.error(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const showComment = async (req:Request,res:Response) => {
    const tweetId = req.params.tweetId
    
    try {

        if(!tweetId) {
            return res.status(400).json({
                message: "Tweet Id is not find"
            })
        }

        const comment = await Comment.find({
            tweetId: tweetId
        })

        if(!comment) {
            return res.status(400).json({
                message: "Not find any comment."
            })
        }

        res.status(200).json({
            message: "Comments find.",
            data: comment
        })
        
    } catch(e) {
        console.error(e)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

} 

export {
    createComment,
    showComment
}