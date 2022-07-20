import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/register.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

      findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
      }

      async create(registerDto: RegisterDto): Promise<User> {
        return this.usersRepository.save(registerDto);
      }
    
      async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
      }
}
