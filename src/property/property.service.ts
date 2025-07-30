
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { updatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDto } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PropertyService {

    constructor(
        @InjectRepository(Property) private propertyRepo: Repository<Property>
    ) {}

    async findOne(id: number) {
        const property =  await this.propertyRepo.findOneBy({ id });

        if(!property) throw new NotFoundException(`Property with id ${id} not found`);
        return property;
        
    }

    async findAll(query: PaginationDto) {
        return await this.propertyRepo.find(
            {
                skip: query.page ? (query.page - 1) * (query.limit ?? DEFAULT_PAGE_SIZE) : 0,
                take: query.limit ?? DEFAULT_PAGE_SIZE,
                // order: {
                //     id: 'ASC',
                // },
            }
        );
    }

    async create(dto: CreatePropertyDto) {
        return await this.propertyRepo.save(dto);
    }
    async update(id: number, dto: updatePropertyDto) {
        const property = await this.propertyRepo.findOneBy({ id });
        if (!property) {
            throw new Error('Property not found');
        }
        return await this.propertyRepo.update({id}, dto);

    }
    
    async delete(id: number) {
        const property = await this.propertyRepo.findOneBy({ id });
        if (!property) {
            throw new Error('Property not found');
        }
        return await this.propertyRepo.delete({id});
    }
}