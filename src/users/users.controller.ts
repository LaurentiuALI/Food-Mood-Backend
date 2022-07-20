import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAll() {
       return this.usersService.findAll(); 
    }

    @Get(":id")
    getById(@Param('id') id: number) {
       return this.usersService.findOne(id); 
    }
}
