import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateFlashcardGroupDto } from './dto/create-flashcards.dto';
import { UpdateFlashcardGroupDto } from './dto/update-flashcards.dto';
import { FlashcardService } from './flashcard.service';

@Controller('flashcards')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.flashcardService.findAll(+req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createFlashcardDto: CreateFlashcardGroupDto, @Req() req) {
    return this.flashcardService.create(createFlashcardDto, +req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.flashcardService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateFlashcardDto: UpdateFlashcardGroupDto,
  ) {
    return this.flashcardService.update(+id, updateFlashcardDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  remove(@Param('id') id: string) {
    return this.flashcardService.remove(+id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  removeAll(@Req() req) {
    return this.flashcardService.removeAll(+req.user.id);
  }
}
