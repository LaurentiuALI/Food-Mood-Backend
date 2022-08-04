import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/register.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User> {

    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email: email });
  }


  async create(registerDto: RegisterDto) {
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    // await this.findByEmail(registerDto.email).then( (response) => {
    //   if(response !== null){
    //     throw new HttpException({
    //       status: HttpStatus.FORBIDDEN,
    //       error: 'Email is duplicated',
    //     }, HttpStatus.FORBIDDEN);
    //   }
    // });
    return this.usersRepository.save(registerDto);
  }

  async updatePreferences(email: string, preferences: string[]) {
    // UPDATE users SET preferences=preferences WHERE id=userId
    return await this.usersRepository.update({ email: email }, { preferences: preferences });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
