import { faker } from "@faker-js/faker";
import { Property } from "../entities/property.entity";
import { PropertyType } from "../entities/propertyType.entity";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { PropertyFeature } from "../entities/propertyFeature.entity";

export class MainSeeder implements Seeder {
     public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
          const typeRepo = dataSource.getRepository(PropertyType);

          console.log("Seeding property types...");
          const propertyTypes = await typeRepo.save([
               { value: "Condo" },
               { value: "Apartment" }
          ]);

          const userFactory = factoryManager.get(User);

          console.log("Seeding users...");
          const users = await userFactory.saveMany(10);

          const propertyFactory = factoryManager.get(Property);
          const propertyFeatureFactory = factoryManager.get(PropertyFeature);

          console.log("Seeding properties...");
          const properties = await Promise.all(
               Array(20).fill("").map(async () => {
                 const property = await propertyFactory.make({
                    user: faker.helpers.arrayElement(users), // Assign a random user from the array
                    type: faker.helpers.arrayElement(propertyTypes), // Assign a random property type from the array
                    propertyFeature: await propertyFeatureFactory.save() // Create a new property feature
                 })

                 return property;
               })
          )

          const propertyRepo = dataSource.getRepository(Property);
          await propertyRepo.save(properties);
     }
}