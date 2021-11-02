import { Base } from "./base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class SubComment extends Base {

    @Column()
    email: string;

    @Column()
    text: string;

    @Column()
    commentId: string;

    @Column()
    userId: string;
}