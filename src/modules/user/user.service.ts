import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (paylod: Prisma.UserCreateInput) => {
    console.log({paylod});
    const createdUser = await prisma.user.create({
        data: paylod
    })
    return createdUser
};

const getAllUser = async () =>{
    const result = await prisma.user.findMany({
        select:{
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            phone: true,
            picture: true,
            status: true,
            isVerifide: true,
            createdAt: true,
            updatedAt: true,
            post: true
        }
    });
    return result
}

const getSingleUse = async (id: number) =>{
    const result = await prisma.user.findUnique({
        where:{
            id
        },
        select:{
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            phone: true,
            picture: true,
            status: true,
            isVerifide: true,
            createdAt: true,
            updatedAt: true,
            post: true
        }
    })
    return result
}

const updateUser = async (id: number, paylod: Partial<User>) =>{
    const result = await prisma.user.update({
        where:{
            id
        },
        data:paylod
    })
    return result
}

const deleteUser = async (id: number) =>{
    const result = await prisma.user.delete({
        where:{
            id
        }
    })
    return result
}

export const UserService = {
    createUser,
    getAllUser,
    getSingleUse,
    updateUser,
    deleteUser,
};
