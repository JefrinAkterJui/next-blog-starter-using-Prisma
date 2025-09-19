import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const login = async (req: Request, res: Response) =>{
    try {
        const result = await AuthService.login(req.body)
        res.status(200).json({
            success: true,
            message: "User retrive successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: (error as Error).message,
        });
    }
}

const authGoogle = async (req: Request, res: Response) =>{
    try {
        const result = await AuthService.authGoogle(req.body)
        res.status(200).json({
            success: true,
            message: "User retrive successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: (error as Error).message,
        });
    }
}

export const AuthController ={
    login,
    authGoogle
}