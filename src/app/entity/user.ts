//user.ts
import { Base } from "./base.entity";
import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from "typeorm";

@Entity()
export class User extends Base {
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    token: string;


}