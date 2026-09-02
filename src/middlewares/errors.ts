import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpException } from "../exceptions/root.js";

export const errorMiddleware = (error: Error, req:Request, res:Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            errorCode: 400,
            errors: error.issues,
        })
    }

    if (error instanceof HttpException) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode,
            errors: error.errors,
        })
    }

    return res.status(500).json({
        message: error.message || "Internal Server Error",
        errorCode: 500,
        errors: null,
    })
}
