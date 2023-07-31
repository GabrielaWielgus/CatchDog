import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Walk } from "./Walk"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column("text")
    firstName: string
    @Column("text")
    lastName: string
    @Column("text")
    password: string
    @Column("text", {unique: true})
    email: string

    @OneToMany(() => Walk, walk => walk.user)
    walks: Walk[]
}

