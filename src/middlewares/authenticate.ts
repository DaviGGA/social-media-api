import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/api-error";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import app from "../index";
import { EntityManager } from "typeorm";

type JWTPayload = {
    id: number,
    email: string
}


export class Authenticate {

    public static async middleware(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new UnauthorizedError("Token não existe")
        }

        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY ?? '') as JWTPayload;
        
        let dbManager: EntityManager = app.database.manager;   
        const userRep = dbManager.getRepository(User);
        const user: User | null = await userRep.findOneBy({id})

        if (!user) {
            throw new UnauthorizedError("Token inválido")
        }

        const {password: _, ...loggedUser} = user
        req.user = loggedUser;

        next();

    }
}