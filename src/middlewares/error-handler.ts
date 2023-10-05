import { NextFunction, Request, Response } from "express";
import { APIError } from "../errors/api-error";


export class ErrorHandler {
    
    public static  middleware (
        error: Error & Partial<APIError>, 
        req: Request, 
        res: Response, 
        next: NextFunction
    ) {
        let statusCode: number = error.statusCode ?? 500;
        let message: string = error.message ?? 'Internal Server Error';
        
        console.log(error)

        return res.status(statusCode).json({message});
    }
    


}