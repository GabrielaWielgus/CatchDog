import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Dog } from "./Dog";
import { Treatment } from "./Treatment";

@Entity()
export class DogTreatment {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    date: string
    
    @Column({nullable: true, default: null})
    controlDate: string
    @Column({nullable: true, default: null})
    drugs: string
    @Column({nullable: true, default: null})
    notes: string

    @ManyToOne(() => Dog, dog => dog.treatments, {onDelete: "CASCADE"})
    dog: Dog
    @ManyToOne(() => Treatment, treatment => treatment.dogTreatment)
    treatment: Treatment
}