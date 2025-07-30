import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import dbConfigProduction from './config/db.config.production';

@Module({
  imports: [ConfigModule.forRoot({ // required for environment variables
    isGlobal: true,
    expandVariables: true, // allows environment variables to be used in the config
    load: [dbConfig, dbConfigProduction] 
  }),
     PropertyModule, TypeOrmModule.forRootAsync({
      useFactory: () => process.env.NODE_ENV === 'production' ? dbConfigProduction() : dbConfig(), 
     })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
