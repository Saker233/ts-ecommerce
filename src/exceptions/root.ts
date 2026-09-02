// message, statusCode, erroCode, error message

export class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    statusCode: number;
    errors?: ErrorCode | null;

    constructor(message:string, errorCode: ErrorCode, statusCode:number, errors?: ErrorCode | null) {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors =  errors
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 404,
    USER_ALREADY_EXIST = 401,
    INCORRECT_PASSWORD = 401,
    UNPROCESSABLE_ENTITY = 405,
    INTERNAL_EXCEPTION= 500,
    UNAUTHORIZED = 401,
}
