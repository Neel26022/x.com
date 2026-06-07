import mongoose, { Schema } from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    tweetId: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})


const BookMark = mongoose.model('BookMark', bookmarkSchema)

export default BookMark