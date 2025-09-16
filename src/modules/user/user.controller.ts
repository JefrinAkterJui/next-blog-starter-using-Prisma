import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) =>{
    try {
        const result = await UserService.createUser(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllUser = async (req: Request, res: Response) =>{
    try {
        const result = await UserService.getAllUser()
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getSingleUser = async (req: Request, res: Response) =>{
    try {
        const result = await UserService.getSingleUse(Number(req.params.id))
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}


const updateUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const payload = req.body; 

        const result = await UserService.updateUser(id, payload);

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: (error as Error).message,
        });
    }
};


const deleteUser = async (req: Request, res: Response) =>{
    try {
        const result = await UserService.deleteUser(Number(req.params.id))
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).send(error)
    }
}

export const UserController ={
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}