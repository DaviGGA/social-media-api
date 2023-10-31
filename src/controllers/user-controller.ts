import { Database } from "../database/database";
import { UserService } from "../services/user-service";
import { Request, Response, NextFunction } from 'express';
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { BadRequestError, NotFoundError } from "../errors/api-error";

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

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password } = req.body;

        const user: User | null = await this.service.findUserByEmail(email);

        if (!user) {
            throw new NotFoundError("Email ou senha inválido.")
        }

        const verifyPassword: boolean = await bcrypt.compare(password, String(user.password));
        if (!verifyPassword) {
            throw new BadRequestError("Email ou senha inválido.")
        }
   
        const token = jwt.sign(
            {
                id: user.id, 
                email: user.email
            }, 
            process.env.JWT_SECRET_KEY ?? '',
            {expiresIn: '1d'}
        )

        let {password: _, ...userLogin} = user;

        res.status(200).json({
            user: userLogin,
            token: token
        })

    }
}