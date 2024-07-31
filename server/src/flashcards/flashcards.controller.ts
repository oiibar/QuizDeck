import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Flashcard } from './entities/flashcard.entity';
import { CreateFlashcardDto } from './dto/create.dto';
import { FlashcardService } from './flashcards.service';
import { UpdateFlashcardDto } from './dto/update.dto';

@Controller('flashcards')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post()
  create(@Body() createFlashcardDto: CreateFlashcardDto): Promise<Flashcard> {
    return this.flashcardService.create(createFlashcardDto);
  }

  @Get()
  findAll(): Promise<Flashcard[]> {
    return this.flashcardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Flashcard> {
    return this.flashcardService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFlashcardDto: UpdateFlashcardDto,
  ): Promise<Flashcard> {
    return this.flashcardService.update(id, updateFlashcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.flashcardService.remove(id);
  }
}
