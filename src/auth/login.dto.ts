import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty( { type: String } )
    @IsEmail({},{message:"Please enter a valid email address."})
    email: string;

    @ApiProperty( { type: String } )
    @IsNotEmpty({message:"Please enter a valid password."})
    password: string;
}