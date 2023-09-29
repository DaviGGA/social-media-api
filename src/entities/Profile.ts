import { type } from "os";
import "reflect-metadata"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    @Column({type:"number"})
    user: number;



}