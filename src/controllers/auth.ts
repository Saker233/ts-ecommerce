import type { NextFunction, Request, Response } from "express"
import { prisma } from "../lib/prisma.js"
import { hashSync, compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets.js"
import { BadRequestsException } from "../exceptions/bad-requests.js"
import { ErrorCode } from "../exceptions/root.js"
import { NotFoundException } from "../exceptions/not-found.js"
import { UnauthorizedException } from "../exceptions/unauthorized.js"
import { UnprocessableEntity } from "../exceptions/validation.js"
import { signupSchema } from "../schema/users.js"

export const login = async (req: Request, res:Response, next:NextFunction) => {
    const {email, password} =  req.body

    let user =  await prisma.user.findFirst({where: {email}})
    if(!user) {
        throw new NotFoundException("User Not found!")
    }
    const matchPass = compareSync(password, user.password)
    if (!matchPass) {
        throw new UnauthorizedException("Bad Credentials", ErrorCode.INCORRECT_PASSWORD)
    }
    const token = jwt.sign(
        {userId: user.id},
        JWT_SECRET,
    )
    const Username = user.email

    res.json({Username, token})
}

export const signup = async (req:Request, res:Response, next:NextFunction) => {
    signupSchema.parse(req.body)
        const {email, password, name} =  req.body

        let user =  await prisma.user.findFirst({where: {email}})
        if (user) {
            return next(new BadRequestsException("User is Already Exist", ErrorCode.USER_ALREADY_EXIST))
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


export const me = async (req:Request, res:Response) => {
        res.json(req.user)
}