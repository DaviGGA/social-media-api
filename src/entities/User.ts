import "reflect-metadata"
import { BeforeInsert, Column, Entity, JoinColumn, 
OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Profile } from "./Profile";
import { ValidationError } from "../errors/api-error";

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar'})
    email: String;

    @Column({type:'varchar'})
    password: String;

    @OneToOne(() => Profile, {nullable: true, cascade: true})
    @JoinColumn()
    profile?: Profile;

    @BeforeInsert()
    public async beforeInsert(): Promise<void> {
        this.validate();
        await this.hashPassword();
    }

    private async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(String(this.password),10);
    }

    private validate(): void {
        this.validateEmail();
        this.validatePassword();
    }


    private validateEmail(): void {
        // poor email validation       
        if (!this.email.includes('@') || !this.email.includes('.com')) {
            throw new ValidationError("Email is invalid.");
        }
    }
    
    private validatePassword(): void {
        if (this.password.length < 8) {
            throw new ValidationError("Password should have atleast 8 characters");
        }

        if (this.password.length > 16) {
            throw new ValidationError("Password should not have more than 16 characters")
        }

        const specialCharacterRegex: RegExp = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
        const numberRegex: RegExp = /\d/;

        const hasSpecialCharacter: boolean = specialCharacterRegex.test(String(this.password));
        const hasDigit: boolean = numberRegex.test(String(this.password));

        if (!hasSpecialCharacter || !hasDigit) {
            throw new ValidationError("Password should contain at least 1 digit and 1 special character")
        }
    }
}