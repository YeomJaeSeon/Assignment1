import { Base } from "./base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Comment extends Base {

    @Column()
    postId: number;

    @Column()
    depth: number;

    @Column()
    parentId: string;

    @Column()
    author: string;

    @Column()
    text: string;
}
