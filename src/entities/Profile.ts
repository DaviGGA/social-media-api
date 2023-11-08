import "reflect-metadata"
import { BeforeInsert, Column, Entity, 
    PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
@Unique(['username'])
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

    @OneToMany(() => Post, (post) => post.profile)
    posts: Post[]

}