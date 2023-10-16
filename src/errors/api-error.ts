export class APIError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class ValidationError extends APIError {
    constructor(message: string) {
        super(message,422);
    }
}

export class NotFoundError extends APIError {
    constructor(message: string) {
        super(message,404);
    }
}

export class BadRequestError extends APIError {
    constructor(message:string) {
        super(message,400);
    }
}