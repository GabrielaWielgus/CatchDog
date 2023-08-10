import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { DogTreatment } from "./DogTreatment";


@Entity()
export class Treatment{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

    @OneToMany(() => DogTreatment, dogTreatment => dogTreatment.treatment)
    dogTreatment: DogTreatment[]
}