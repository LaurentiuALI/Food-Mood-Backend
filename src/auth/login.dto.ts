import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({},{message:"Please enter a valid email address."})
    email: string;

    @IsNotEmpty({message:"Please enter a valid password."})
    password: string;
}