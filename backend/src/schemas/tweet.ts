import mongoose, { Document, Schema, Types } from "mongoose";

interface ITweet extends Document {
    userId: Types.ObjectId;
    title: string;
    bookmark: boolean;
    description: string;
    image?: string; 
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
    }
}, {
    timestamps: true 
});


const Tweet = mongoose.model<ITweet>('Tweet', tweetSchema);

export default Tweet;
