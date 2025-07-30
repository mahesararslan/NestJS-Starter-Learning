import { Faker } from "@faker-js/faker";
import { PropertyFeature } from "../entities/propertyFeature.entity";
import { setSeederFactory } from "typeorm-extension";


export const propertyFeatureFactory = setSeederFactory(PropertyFeature, (faker) => {
    const propertyFeature = new PropertyFeature();
    propertyFeature.bedrooms = faker.number.int({ min: 1, max: 5 });
    propertyFeature.bathrooms = faker.number.int({ min: 1, max: 5 });
    propertyFeature.area = faker.number.int({ min: 500, max: 5000 });
    propertyFeature.parkingSpots = faker.number.int({ min: 0, max: 3 });
    propertyFeature.hasBalcony = faker.datatype.boolean();
    propertyFeature.hasSwimmingPool = faker.datatype.boolean();
    propertyFeature.hasGardenYard = faker.datatype.boolean();

    return propertyFeature;
});