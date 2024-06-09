import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    username: string;

    @IsEmail()
    email: string;

}