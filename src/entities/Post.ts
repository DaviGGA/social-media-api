import { BeforeInsert, Column, Entity, 
    PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar",length: 240})
    description: string;

    @Column({type: "boolean"})
    edited: boolean;
}