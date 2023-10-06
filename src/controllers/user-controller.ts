import { Database } from "../database/database";
import { UserService } from "../services/user-service";
import { Request, Response, NextFunction } from 'express';
import { User } from "../entities/User";

export class UserController {
    service: UserService;

    constructor(database: Database) {
        this.service = new UserService(database);
    }

    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let {
            email,
            password,
            confirmPassword
        } = req.body;

        let user: User = new User();
        user.email = email;
        user.password = password;
            
        if (password === confirmPassword) {
            const newUser: User = await this.service.createUser(user);

            res.status(201).send({
                message: "User succesfully created!",
                data: newUser
            })
        }
    }
}