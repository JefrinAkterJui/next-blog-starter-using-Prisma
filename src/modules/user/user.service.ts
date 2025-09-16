import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (paylod: Prisma.UserCreateInput) => {
    console.log({paylod});
    const createdUser = await prisma.user.create({
        data: paylod
    })
    return createdUser
};

export const UserService = {
    createUser,
};
