import { BeforeInsert, Column, Entity, 
    PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar"})
    image: string;

    @Column({type:"varchar",length: 240})
    description: string;

    @Column({type: "boolean", default: false})
    edited: boolean;

    @ManyToOne(() => Profile, (profile) => profile.posts)
    profile: Profile
}