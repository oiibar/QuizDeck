import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  BadRequestException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Flashcard } from './entities/flashcard.entity';
import { CreateFlashcardDto } from './dto/create.dto';
import { FlashcardService } from './flashcards.service';
import { UpdateFlashcardDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('flashcards')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(
    @Body() createFlashcardDto: CreateFlashcardDto,
    @Req() req,
  ): Promise<Flashcard> {
    return this.flashcardService.create(createFlashcardDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAll(@Req() req): Promise<Flashcard[]> {
    if (!req.user || !req.user.id) {
      throw new BadRequestException('User ID not found in request');
    }
    return this.flashcardService.findAll(+req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: number): Promise<Flashcard> {
    return this.flashcardService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: number,
    @Body() updateFlashcardDto: UpdateFlashcardDto,
  ): Promise<Flashcard> {
    return this.flashcardService.update(id, updateFlashcardDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  remove(@Param('id') id: number, @Req() req): Promise<void> {
    return this.flashcardService.remove(id, +req.user.id);
  }
}
