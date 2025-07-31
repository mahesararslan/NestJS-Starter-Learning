import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateUserDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    avatarUrl?: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
