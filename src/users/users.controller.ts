import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAll() {
       return this.usersService.findAll(); 
    }

    @Get(":id")
    getById(@Param('id') id: number) {
       return this.usersService.findById(id); 
    }
}
