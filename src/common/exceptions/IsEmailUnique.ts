import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "src/users/users.service";


@ValidatorConstraint({ name: 'emailUnique', async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
    constructor(private usersService: UsersService) {}

    async validate(email: string){
      console.log("AM INTRAT ");
      try{
        await this.usersService.findByEmail(email);
      } catch(e){
        console.log(e);
        return false;
      }
      return true;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} ${validationArguments.value} is already taken.`;
    }
}

// import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
// import { UsersService } from "src/users/users.service";


// @ValidatorConstraint()

// export class IsEmailUnique implements ValidatorConstraintInterface {

//   constructor(private readonly UsersService: UsersService) {}

//   validate(email: string, args: ValidationArguments): boolean {

//     console.log("aici:", this.UsersService.test());
//     return true;
//   }

//   defaultMessage(args: ValidationArguments) {
//     // here you can provide default error message if validation failed
//     return 'Email ($value) already exists!';
//   }

//   }




// import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
// import { UsersService } from "src/users/users.service";

// export class IsEmailUnique implements ValidatorConstraintInterface {
//     constructor(private readonly usersService: UsersService) {}

//     validate(email: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
//         return !this.usersService.findByEmail(email);
//     }
//     defaultMessage?(validationArguments?: ValidationArguments): string {
//         return `${validationArguments.property} ${validationArguments.value} is already taken.`;
//     }}