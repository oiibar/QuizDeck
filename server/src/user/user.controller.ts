import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  Get,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const message = await this.userService.remove(id);
      return { message };
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    const username = req.user.username;
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      flashcardGroups: user.flashcardGroups,
    };
  }
}
