import type {Request, Response, NextFunction} from 'express'
import { ZodError } from 'zod'
import { ErrorCode, HttpException } from "./exceptions/root.js";
import { InternalException } from './exceptions/internal-exception.js';

type Handler = (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>

export const errorHandler = (method: Handler) => {
    return async (req: Request, res:Response, next:NextFunction) => {
        try {
            await method(req, res, next)
        } catch(error: any) {
            if (error instanceof ZodError) {
                return next(error)
            }
            let exception: HttpException
            if(error instanceof HttpException) {
                exception =  error
            } else {
                exception = new InternalException("Something Went Wrong", error, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception)
        }
    }
}
