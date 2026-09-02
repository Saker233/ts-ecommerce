import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"
import { hashSync, compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets.js"

export const login = async (req: Request, res:Response) => {
    const {email, password} =  req.body

    let user =  await prisma.user.findFirst({where: {email}})
    if(!user) {
        throw Error("User Does Not Exist")
    }
    const matchPass = compareSync(password, user.password)
    if (!matchPass) {
        throw Error("Bad Credentials")
    }
    const token = jwt.sign(
        {userId: user.id},
        JWT_SECRET,
    )
    const Username = user.email

    res.json({Username, token})
}

export const signup = async (req:Request, res:Response) => {
    const {email, password, name} =  req.body

    let user =  await prisma.user.findFirst({where: {email}})
    if (user) {
        throw Error("User already exists!")
    }
    user =  await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}
