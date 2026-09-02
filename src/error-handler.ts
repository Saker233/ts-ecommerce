import type {Request, Response, NextFunction} from 'express'
import { ErrorCode, type HttpException } from "../exceptions/root.ts";
import { InternalException } from './exceptions/internal-exception.js';

export const errorHandler = (method: Function) => {
    return async (req: Request, res:Response, next:NextFunction) => {
        try {
            await method(req, res, next)
        } catch(error: any) {
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