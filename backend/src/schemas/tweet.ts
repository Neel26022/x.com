import mongoose, { Document, Schema, Types } from "mongoose";
import { showComment } from "../controllers/comment.js";

interface ITweet extends Document {
    userId: Types.ObjectId;
    title: string;
    bookmark: boolean;
    description: string;
    image?: string; 
    views: number;
    replay: Types.ObjectId[];
}

const tweetSchema = new Schema<ITweet>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    title: {
        type: String,
        required: true 
    },
    bookmark: {
        type: Boolean,
        default: false
    },
    description: { 
        type: String,
        required: true 
    },
    image: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }, 
    replay: [{
        type: Schema.Types.ObjectId,
        ref: 'Replay'
    }]
}, {
    timestamps: true 
});


const Tweet = mongoose.model<ITweet>('Tweet', tweetSchema);

export default Tweet;
