import { ErrorCode, HttpException } from "./root.js";

export class InternalException extends HttpException {
    constructor(message: string, errors: ErrorCode | null, errorCode: ErrorCode) {
        super(message, errorCode, 500, errors)
    }
}
