import { Base } from "./base.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { Comment } from "./comment";
@Entity()
export class Post extends Base {
    // @BeforeInsert()
    // initValue() {
    //     this.count = 0;
    //     this.views = [];
    //     this.comments = [];
    // }
    @Column()
    title: string;

    @Column()
    userEmail: string

    @Column()
    text: string;

    @Column()
    category: string

    @Column({ default: 0 })
    count: number;

    @Column({ default: [] })
    views: string[];

    @Column({ default: [] })
    comments: Comment[];
}
