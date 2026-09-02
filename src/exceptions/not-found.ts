import { ErrorCode, HttpException } from "./root.js";

export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCode = ErrorCode.USER_NOT_FOUND, errors?: ErrorCode | null) {
        super(message, errorCode, 404, errors)
    }
}
