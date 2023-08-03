import { Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, Column, JoinColumn } from "typeorm";
import { Chat } from "./Chat";
import { User } from "../User";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id: number

    @Column("text") 
    data: string

    @CreateDateColumn()
    created: string

    // Many messages belong to one user
    @ManyToOne(() => User, user => user.messages)
    sender: User

    // Many messages can belong to the same chat
    @ManyToOne(() => Chat, chat => chat.messages, {eager: true})
    chat: Chat    
}

