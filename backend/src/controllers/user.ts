import type { Request, Response } from "express"
import User from "../schemas/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface ISignupBody {
    username: string;
    password: string;
    name: string;
}

const Signup = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { username, password, name } = req.body as ISignupBody;

        if (!username || !password || !name) {
            return res.status(400).json({
                message: 'All fields are required'
            }); 
        }

        const existUser = await User.findOne({ userName: username });

        if (existUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashPassword =  await bcrypt.hash(password,10)

        const user = await User.create({
            userName: username,
            password: hashPassword, 
            name: name
        });

        return res.status(201).json({
            message: 'User registered successfully',
            userId: user._id
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

interface ILogin {
    username: string;
    password: string;
}

export const Login = async (req: Request,res: Response): Promise<Response> => {

    const { username, password } = req.body as ILogin

    if (!username || !password) {
        return res.status(400).json({
        message: "All fields are required",
        })
    }

    try {
        
        const user = await User.findOne({
            userName: username,
        })

        if (!user) {
            return res.status(404).json({
            message: "User not found",
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password!)

        if (!isPasswordValid) {
            return res.status(401).json({
            message: "Invalid credentials",
            });
        }

        const accessTokenSecret = process.env.JWT_SECRET;
        const refreshTokenSecret = process.env.REFRESH_SECRET;

        if (!accessTokenSecret || !refreshTokenSecret) {
            return res.status(500).json({
            message: "JWT secrets not configured",
            });
        }

        const accessToken = jwt.sign({userId: user._id,},accessTokenSecret,{expiresIn: "1h",})

        const refreshToken = jwt.sign({userId: user._id,},refreshTokenSecret,{expiresIn: "7d",})

        user.refreshToken = refreshToken
        await user.save()

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
            id: user._id,
            username: user.userName,
            },
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Internal server error",
        })
    }
}

export default {
    Signup,
    Login
}