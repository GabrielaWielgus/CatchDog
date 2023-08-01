
import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import { Chatter } from "./Chatter";
import { Message } from "./Message";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    created: Date

    // One chat has many chatters
    @OneToMany(() => Chatter, chatter => chatter.chat, {nullable: false, eager: true})
    chatters: Chatter[];

    // One chat has many messages
    @OneToMany(() => Message, message => message.chat)
    messages: Message[];
}