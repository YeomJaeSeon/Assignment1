import { Base } from "./base.entity";
import { Column, Entity } from "typeorm";
import { SubComment } from "./subcomment";

@Entity()
export class Comment extends Base {

    @Column()
    postId: number;

    @Column({ default : [] })
    subComments: SubComment[];

    @Column()
    email: string;

    @Column()
    text: string;
}