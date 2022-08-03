import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { IsEmailUnique } from 'src/common/exceptions/IsEmailUnique';

export class RegisterDto {
    @IsNotEmpty()
    name: string;

    @Validate(IsEmailUnique)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()   
    password: string;

    @IsNotEmpty()  
    // @Match("password") 
    passwordConfirmation: string;
}