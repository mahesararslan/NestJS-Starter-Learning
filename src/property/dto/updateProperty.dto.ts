import { PartialType } from "@nestjs/mapped-types";
import { CreatePropertyDto } from "./createProperty.dto";

export class updatePropertyDto extends PartialType(CreatePropertyDto) {
    // This class will inherit all properties from CreatePropertyDto
    // and make them optional for the update operation.
    // You can add additional properties specific to the update operation if needed.
    
}