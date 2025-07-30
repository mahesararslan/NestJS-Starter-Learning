import { Faker } from "@faker-js/faker";
import { Property } from "../entities/property.entity";
import { setSeederFactory } from "typeorm-extension";


export const propertyFactory = setSeederFactory(Property, (faker) => {
    const property = new Property();

    property.name = faker.location.street();
    property.description = faker.lorem.sentence();
    property.price = +faker.commerce.price({ min: 100, max: 1000000 });
    
    return property;
});