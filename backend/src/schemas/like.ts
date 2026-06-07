import mongoose, { Schema, Document, Types } from "mongoose";

interface Ilike extends Document {
    tweetId: Types.ObjectId,
    userId: Types.ObjectId
}

const likeSchema = new mongoose.Schema<Ilike>({
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
}, {
    timestamps: true 
})

const Like = mongoose.model<Ilike>('Like', likeSchema)

export default Like