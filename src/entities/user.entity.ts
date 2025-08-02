import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";
import { Role } from 'src/auth/enums/role.enums';

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

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER, // default role is USER
        nullable: false // role should not be null
    })
    role: Role;

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