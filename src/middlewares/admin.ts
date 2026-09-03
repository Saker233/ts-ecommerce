import type { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.js";
import { ErrorCode } from "../exceptions/root.js";

const adminMiddleware = async(req:Request, res:Response, next:NextFunction) => {
    const user = req.user
    if(user.role == 'ADMIN') {
        next()
    } else {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
}


export default adminMiddleware