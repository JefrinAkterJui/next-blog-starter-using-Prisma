import { post, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"
import { get } from "http"

const createPost = async(paylod: Prisma.postCreateInput) =>{
    const result = await prisma.post.create({
        data: paylod,
        include:{
            author:{
                select:{
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                }
            }
        }
    })
    return result
}

const getAllPost = async() =>{
    const result = await prisma.post.findMany()
    return result
}

const getSinglePost = async(id: number) =>{
    const result = await prisma.post.findUnique({
        where:{
            id
        }
    })
    return result
}

const updatePost = async(id:number, payload: Partial<post>) =>{
    const result = await prisma.post.update({
        where:{
            id
        },
        data: payload
    })
    return result
}

const deletePost = async(id:number) =>{
    const result = await prisma.post.delete({
        where:{
            id
        }
    })
    return result
}

export const PostService ={
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost
}