import { Database } from "../database/database";
import { Request, Response, NextFunction } from 'express';
import { PostService } from "../services/post-service";

export class PostController {
    service: PostService

    constructor(database: Database) {
        this.service = new PostService(database);
    }

    public createPost = async (req: Request,res: Response, next: NextFunction): Promise<void> => {
        
    }

}