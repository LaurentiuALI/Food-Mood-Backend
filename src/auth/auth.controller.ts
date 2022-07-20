import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Post("register")
    async register(@Body() request: RegisterDto) {
        return await this.usersService.create(request);
    }
}
