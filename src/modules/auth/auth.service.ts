import { prisma } from "../../config/db";
import { Prisma } from "@prisma/client";


const login = async ({ email, password }: {email: string, password: string}) => {
    console.log({email, password});
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        throw new Error("User not found")
    }
    if(password !== user.password){
        throw new Error("Password does not metch")
    }else{
        return user
    }
};

const authGoogle = async( data: Prisma.UserCreateInput )=>{
    let user = await prisma.user.findUnique({
        where:{
            email: data.email
        }
    })
    if(!user){
        user = await prisma.user.create({
            data
        })
    }
    return user
}

export const AuthService ={
    login,
    authGoogle
}