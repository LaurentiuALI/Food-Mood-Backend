import { Body, Controller, Post, UseGuards, Request, Get, Put, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './login.dto';
import { LoginResponse } from './login-response.dto';
import { RegisterDto } from './register.dto';
import { LocalStrategy } from './local.strategy';

@Controller('auth')
@ApiTags('Authentication')
@ApiResponse({type: LoginResponse})
export class AuthController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService, private readonly localStrategy: LocalStrategy) {}


  @Post('login')
  async login(@Body() request: LoginDto): Promise<LoginResponse> {
    await this.localStrategy.validate(request.email, request.password);
    return this.authService.login(request);
  }

  @Post('register')
  async register(@Body() request: RegisterDto) {
    return await this.usersService.create(request);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findByEmail(req.user.email);
    delete user.password;

    return user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('profile2')
  async getProfile2(@Request() req, @Body() preferences: string[]) {

    const oldUser = await this.usersService.findByEmail(req.user.email);

    await this.usersService.updatePreferences(req.user.email, preferences);

    const user = await this.usersService.findByEmail(req.user.email);
    delete user.password;

    return {
      oldUser: oldUser,
      user: user,
      preferences: preferences
    };
  }
}
