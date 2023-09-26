import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private email: String;

    @Column({length:16})
    private password: String;

    validateEmail(): void {
        if (!this.email.includes('@') || !this.email.includes('.com')) {
            throw new Error("Validation Error: email is invalid")
        }
    }



}