import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ nullable: true }) // made nullable true because there is already records in my db which dont have password
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Property, (property) => property.user)
    properties: Property[]; 

    @ManyToMany(() => Property, (property) => property.likedBy)
    @JoinTable({name: "user_liked_properties"})
    likedProperties: Property[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}