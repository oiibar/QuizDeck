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
  Patch,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

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
    const email = req.user.email;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      flashcardGroups: user.flashcardGroups,
    };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const email = req.user.email;
    const updatedUser = await this.userService.updateProfile(
      email,
      updateUserDto,
    );

    if (!updatedUser) {
      throw new BadRequestException('Failed to update profile');
    }

    return updatedUser;
  }
}
