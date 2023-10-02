import "reflect-metadata"
import { BeforeInsert, Column, Entity, 
    PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    surname: string;

    @Column({type: "varchar"})
    username: string;

    @Column({type:"varchar", nullable:true})
    image: string;

}