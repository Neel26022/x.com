import type { Request, Response } from "express";

interface ISignupBody {
    username: string;
    password: string;
    name: string;
}

export const signup = (req: Request, res: Response) => {

    const { username, password, name } = req.body as ISignupBody;

    if (!username || !password || !name) {
        return res.status(400).json({
            message: 'All fields are required'
        }); 
    }

    return res.status(201).json({
        message: 'User registered successfully'
    });
};
