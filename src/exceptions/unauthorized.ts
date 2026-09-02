import { ErrorCode, HttpException } from "./root.js";

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors?: ErrorCode | null) {
        super(message, errorCode, 401, errors)
    }
}
