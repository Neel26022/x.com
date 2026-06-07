import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
    userName: string;
    password?: string; 
    avatar?: string;
    banner?: string;
    name: string;
    followers: Types.ObjectId[]; 
    following: Types.ObjectId[];
    bio?: string;
    location?: string;
    websiteUrl?: string;
    comments: Types.ObjectId[];
    posts: Types.ObjectId[];
    refreshToken: string;
    bookmark: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true,
        unique: true,
        maxLength: [20, "Username cannot exceed 20 characters"]
    },
    password: { 
        type: String,
        required: true 
    },
    avatar: {
        type: String
    },
    banner: {
        type: String
    },
    name: {
        type: String,
        required: true 
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    bio: {
        type: String
    },
    location: {
        type: String
    },
    websiteUrl: { 
        type: String
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Tweet' 
    }],
    refreshToken: {
        type: String
    }, 
    bookmark: [{
        type: Schema.Types.ObjectId,
        ref: 'BookMark'
    }]
}, {
    timestamps: true 
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
