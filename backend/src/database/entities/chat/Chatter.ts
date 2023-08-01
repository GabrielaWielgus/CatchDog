import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../User";
import { Chat } from "./Chat";

@Entity()
export class Chatter {
    @PrimaryGeneratedColumn()
    public id: number

    // Multiple chatters can belong to the same user
    @ManyToOne(() => User, user => user.chatters, {eager: true})
    user: User

    // One chat has many chatters
    @ManyToOne(() => Chat, chat => chat.chatters)
    chat: Chat
}