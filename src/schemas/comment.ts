import mongoose, { Document, Schema, Types } from "mongoose";

// 1. Define the TypeScript interface for the Comment document
export interface IComment extends Document {
    userId: Types.ObjectId;
    tweetId: Types.ObjectId;
    message: string;
    likes: Types.ObjectId[];
}

const commentSchema = new Schema<IComment>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    tweetId: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true 
    },
    message: {
        type: String,
        required: true
    }, 
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true 
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
