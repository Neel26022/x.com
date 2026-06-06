
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


const showTweet = (req: Request, res: Response) => {
    res.send("Create Tweet")
}

export {
    createTweet,
    showTweet
}