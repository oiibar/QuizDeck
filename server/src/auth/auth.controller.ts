// auth/auth.controller.ts
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto.username, authDto.password);
  }

  @Post('signup')
  async signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto.username, authDto.password);
  }
}
