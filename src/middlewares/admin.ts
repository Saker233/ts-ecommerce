import type { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.js";
import { ErrorCode } from "../exceptions/root.js";

const adminMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const user = req.user
    if (!user || user.role !== "ADMIN") {
        return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }
    next()
}


export default adminMiddleware
