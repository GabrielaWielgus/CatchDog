import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { User } from './User';

@Entity()
export class Walk {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    onLean: string

    @Column()
    behavioralDisorder: string

    @Column({ type: 'datetime' })
    started: Date;

    @Column({ type: 'datetime' })
    ended: Date;

    @ManyToOne(() => User, user => user.walks)
    user: User
}