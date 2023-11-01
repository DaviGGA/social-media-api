import { User } from "../../entities/User";

export {}

declare global {
    namespace Express {
        export interface Request {
            user?: Partial<User>
        }
    }
}