// npm i --save class-validator class-transformer
import { IsString, IsInt, Length } from 'class-validator';

// personally I dont prefer using groups in DTOs, but it is useful in some cases
// groups allow you to define different validation rules for the same property based on the context (e.g., create vs. update)
// or you could just make seperate DTOs for create and update operations

export class CreatePropertyDto {
    @IsString() 
    @Length(2,10, { message: 'Name must be between 2 and 10 characters long' }) // custom error message
        name: string;

    // @IsString({ always: true }) // always validate this field
    @IsString() 
    // @Length(10, 20, { groups: ['create'] }) // length validation for create
    // @Length(2, 50, { groups: ['update'] }) // different length for update
        description: string;

    @IsInt() 
        price: number;
}