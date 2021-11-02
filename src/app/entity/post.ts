//post.ts 
import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
@Entity()
export class Post extends Base {

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    userEmail: string
}