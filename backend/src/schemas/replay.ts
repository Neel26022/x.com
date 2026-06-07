import mongoose, { Types, Document, Schema } from "mongoose"

interface IReplay extends Document {
    tweetID: Types.ObjectId;
    userID: Types.ObjectId;
    text: String;
    like: Number;
}

const replaySchema= new mongoose.Schema<IReplay>({
    tweetID:  {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        required: true
    },
    userID: {
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