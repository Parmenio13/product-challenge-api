import { Request, Response } from "express";
import User, { IUser } from '../models/User';

import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    try {
        const newUser: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser.password = await newUser.encrypPassword(newUser.password);
        const savedUser = await newUser.save();
        const token: string = jwt.sign({ _id: savedUser._id }, process.env['TOKEN_SECRET'] || '', {
            expiresIn: 60*60
        });
        res.header('auth-token', token).json(savedUser);
    } catch (e) {
        res.status(400).json(e);
    }
};

export const signin = async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Credentials are not valid!");
    const correctPassword: boolean = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('Password is not valid');
    const token: string = jwt.sign({ _id: user._id }, process.env['TOKEN_SECRET'] || '', {
        expiresIn: 60*60
    });
    res.header('auth-token', token).json(user);
};
