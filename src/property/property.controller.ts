import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { CreateGovernmentPropertyDto, createGovernmentPropertyZodSchema } from './dto/createPropertyZod.dto';
import { PropertyService } from './property.service';
import { updatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('property')
export class PropertyController {

    constructor(private propertyService: PropertyService) {}

    @Get()
    findAll(@Query() query: PaginationDto) {
        return this.propertyService.findAll(query);
    }

    @Get(':id')
    findOne(@Param() param: IdParamDto) {
        const { id } = param;
        return this.propertyService.findOne(id);
    }


    @Post()
    // @HttpCode(201) // Set HTTP status code to 201 for successful creation
    // @UsePipes(new ValidationPipe()) // Use ValidationPipe to validate incoming data
    // @UsePipes(new ValidationPipe({ whitelist:true })) // removes extra properties in the request body
    // @UsePipes(new ValidationPipe({ whitelist:true, forbidNonWhitelisted: true, groups: ['create'] })) // removes extra properties in the request body and throws an error if non-whitelisted properties are present and uses groups for validation
    create(@Body() body: CreatePropertyDto) {
        console.log('Create Property:', body);

        return this.propertyService.create(body);
        console.log('Request ended');
    }


    @Put(':id')
    // @UsePipes(new ValidationPipe({ whitelist:true, forbidNonWhitelisted: true, groups: ['update'] })) // removes extra properties in the request body and throws an error if non-whitelisted properties are present and uses groups for validation
    update(
        @Param() param: IdParamDto,
        @Body() body: updatePropertyDto
    ) {        
        const { id } = param;        
        return this.propertyService.update(id, body);
    }

    @Delete(':id')
    delete(@Param() param: IdParamDto) {
        const { id } = param;
        return this.propertyService.delete(id);
    }
}
