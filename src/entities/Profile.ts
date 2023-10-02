import "reflect-metadata"
import { BeforeInsert, Column, Entity, 
    PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    surname: string;

    @Column({type: "varchar"})

    @Column({type:"varchar"})
    image: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;



}