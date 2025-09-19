import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) =>{
    try {
        const result = await PostService.createPost(req.body)
        res.status(200).json({
            success: true,
            message: "Post created successfully",
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

const getAllPost = async (req: Request, res: Response) =>{
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = (req.query.search as string) || ""
        const idfeatured = req.query.idfeatured ? req.query.idfeatured === "true" : undefined
        const tags = req.query.tags ? (req.query.tags as string).split(",") :[]
        const result = await PostService.getAllPost({page, limit, search, idfeatured, tags})
        res.status(200).json({
            success: true,
            message: "All Post Retrive successfully",
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

const getSinglePost = async (req: Request, res: Response) =>{
    try {
        const result = await PostService.getSinglePost(Number(req.params.id))
        res.status(200).json({
            success: true,
            message: "Post's Retrive successfully",
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

const updatePost = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const payload = req.body; 

        const result = await PostService.updatePost(id, payload);

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
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

const deletePost = async (req: Request, res: Response) =>{
    try {
        const result = await PostService.deletePost(Number(req.params.id))
        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).send(error)
    }
}

const getBlogStat = async (req: Request, res: Response) =>{
    try {
        const result = await PostService.getBlogStat()
        res.status(200).json({
            success: true,
            message: "Post created successfully",
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

export const PostController ={
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    getBlogStat,
    deletePost
}