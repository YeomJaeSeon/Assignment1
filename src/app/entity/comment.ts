import { Base } from "./base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Comment extends Base {

    @Column()
    postId: number;

    @Column()
    comments: Comment[];

    @Column()
    email: string;

    @Column()
    text: string;
}