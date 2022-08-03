import { IsEmail, isNotEmpty, IsNotEmpty, Length, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { IsEmailUnique } from 'src/common/exceptions/IsEmailUnique';
import { Match } from 'src/common/exceptions/Match';

export class RegisterDto {
    @IsNotEmpty({message:"Please enter a name."})
    name: string;

    @IsEmail({},{message:"Please enter a valid email address."})
    @Validate(IsEmailUnique)
    email: string;

    @IsNotEmpty({message:"Please enter a valid phone number."})
    phoneNumber: string;


    @Length(6,16,{message:"Your password must be between 6-16 characters long."})
    // @MinLength(6,{message:"Password must be between 6-16 characters."})
    // @MaxLength(16,{message:"Password must be between 6-16 characters."})
    @IsNotEmpty()   
    password: string;

    @IsNotEmpty({message: "This does not match the password entered above."})
    @Match('password') 
    passwordConfirmation: string;
}