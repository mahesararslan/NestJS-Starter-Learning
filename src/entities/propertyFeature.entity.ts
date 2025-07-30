import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyFeature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column()
    parkingSpots: number;

    @Column()
    area: number; // in square feet or square meters

    @Column()
    hasBalcony: boolean;

    @Column()
    hasSwimmingPool: boolean;

    @Column()
    hasGardenYard: boolean;

    // foreign key which in this case is a one-to-one relationship with Property
    @OneToOne(() => Property, (property) => property.propertyFeature)
    @JoinColumn() // This decorator is used to specify that this column is a foreign key 
    property: Property;

}