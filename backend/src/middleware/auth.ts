import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

const auth = (req:Request, res:Response, next: NextFunction) => {
    console.log("heello")
    if(!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
        return res.status(400).json({
            message: "Not find the jwt secret and refresh secret"
        })
    }

    const token = req.cookies.accessToken
    console.log("eeee",token)
    const refreshToken = req.cookies.refreshToken

    if (!token) {
        if (refreshToken) {
            return res.status(401).json({
                action: "refresh_token"
            });
        }

        return res.status(401).json({
            action: "login",
            message: "Please login"
        });
    }


    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        req.user = decoded
        next();
    } catch (err) {
        console.error(err)
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
};

export default auth;