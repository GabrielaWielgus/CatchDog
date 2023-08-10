import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Walk } from "./Walk"
import { Chatter } from "./chat/Chatter"
import { Message } from "./chat/Message"
import { Dog } from "./Dog"

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

    // One user has many walks
    @OneToMany(() => Walk, walk => walk.user)
    walks: Walk[]

    // One user has many chatters
    @OneToMany(() => Chatter, chatter => chatter.user)
    chatters: Chatter[]

    // One user has many messages
    @OneToMany(() => Message, message => message.sender)
    messages: Message[]

    // One user has many dogs
    @OneToMany(() => Dog, dog => dog.owner)
    dogs: Dog[]
}

