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

const getAllPost = async({page, limit, search, idfeatured, tags}:{page: number, limit: number, search?: string, idfeatured?: boolean, tags?: string[]}) =>{
    const skip = (page - 1) * limit
    const where: any = {
            AND: [
                search && {
                    OR:[
                        {
                            title:{
                                contains:search,
                                mode: 'insensitive'
                            }
                        },
                        {       
                            title:{
                                contains:search,
                                mode: 'insensitive'
                            }
                        }
                    ],
                },
                typeof idfeatured == 'boolean' && {idfeatured} ,
                (tags && tags.length >0) && {tags: { hasEvery: tags } }
            ].filter(Boolean)
        }
        
        
    const result = await prisma.post.findMany({ skip, take: limit, where })
    const total = await prisma.post.count({where})

    return {
        data: result,
        pagination:{
            page,
            limit,
            total,
            totalPage: Math.ceil(total/limit)
        }
    }
}

const getSinglePost = async(id: number) =>{
    return await prisma.$transaction(async(tx)=>{
        await tx.post.update({
            where:{id},
            data:{
                views:{
                    increment: 1
                }
            }
        })
        return await tx.post.findUnique({
            where:{
                id
            }
        })
    })
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