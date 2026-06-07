
import type { Request, Response } from 'express'
import type { ITweet } from '../types/user.type.js'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import Tweet from '../schemas/tweet.js';

const createTweet = async (req: Request, res: Response) => {
    try {
        const { userId, title, description } = req.body;

        if (!userId || !title || !description) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        let imageUrl = "";

        if (req.file) {
            const base64File = req.file.buffer.toString("base64");

            const dataURI = `data:${req.file.mimetype};base64,${base64File}`;

            const cloudinaryResponse = await cloudinary.uploader.upload(
                dataURI,
                {
                    folder: "tweets",
                }
            );

            imageUrl = cloudinaryResponse.secure_url;
        }

        const tweet = await Tweet.create({
            userId,
            title,
            description,
            image: imageUrl,
        });

        return res.status(200).json({
            message: "Tweet created successfully",
            tweet,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


const showTweet = async (req: Request, res: Response) => {
    try {
        const tweets = await Tweet.find({});

        return res.status(200).json({
            message: "Tweets found successfully",
            count: tweets.length,
            data: tweets,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

const deleteTweet = async (req:Request, res:Response) => {
    const tweetId = req.params.tweetId
    const userId = req.user['userId']

    try {
        if(!tweetId || !userId) {
            return res.status(400).json({
                message: "tweetId or userId is not find"
            })
        }

        const deletedTweet = await Tweet.deleteOne({
            userId: userId,
            tweeetId: tweetId
        })

        if(!deletedTweet) {
            return res.status(400).json({
                message: "tweet is not deleted"
            })
        }

        res.status(200).json({
            message: "Tweet is deleted",
            data: deletedTweet
        })
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
const showOwnTweet = async (req:Request, res:Response) => {
    const userId = req.user['userId']

    try {
        if(!!userId) {
            return res.status(400).json({
                message: "tweetId or userId is not find"
            })
        }

        const ownTweet = await Tweet.find({
            userId: userId
        })

        if(!ownTweet) {
            return res.status(400).json({
                message: "tweet is not findd"
            })
        }

        res.status(200).json({
            message: "Tweet is finded",
            data: ownTweet
        })
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export {
    createTweet,
    showTweet,
    deleteTweet,
    showOwnTweet
}