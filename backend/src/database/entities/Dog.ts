import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import { DogTreatment } from "./DogTreatment";

@Entity()
export class Dog {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    breed: string
    @Column()
    sex: string
    @Column()
    age: number

    @ManyToOne(() => User, user => user.dogs)
    owner: User
    @OneToMany(() => DogTreatment, dogTreatment => dogTreatment.dog)
    treatments: DogTreatment[]
}