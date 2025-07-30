


import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './main.seeder';
import { propertyFeatureFactory } from './propertyFeature.factory';
import { userFactory } from './user.factory';
import { propertyFactory } from './property.factory';
import dbConfig from '../config/db.config';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  factories: [propertyFactory, userFactory, propertyFeatureFactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});