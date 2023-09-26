import { Database } from "../database/database";
import { UserService } from "../services/user-service";
import { Request, Response, NextFunction } from 'express';
import { User } from "../entities/User";

export class UserController {
    service: UserService;

    constructor(database: Database) {
        this.service = new UserService(database);
    }

    public createUser =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const email: string = req.body.email;
        const password: string = req.body.password;
        const confirmPassword: string = req.body.confirm_password;

             
        if (password === confirmPassword) {
            const user: User = await this.service.createUser(email,password);

            res.status(201).send({
                message: "User succesfully created!",
                data: user
            })
        }
    }
}