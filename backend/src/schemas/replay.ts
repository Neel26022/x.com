import mongoose, { Types, Document, Schema } from "mongoose"

interface IReplay extends Document {
    tweetId: Types.ObjectId;
    commentId: Types.ObjectId;
    userId: Types.ObjectId;
    text: String;
    like: Number;
}

const replaySchema= new mongoose.Schema<IReplay>({
    tweetId:  {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        required: true
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true 
})

const Replay = mongoose.model<IReplay>('Replay', replaySchema)

export default Replay