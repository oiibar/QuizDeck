import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flashcard } from './entities/flashcard.entity';
import { FlashcardController } from './flashcards.controller';
import { FlashcardService } from './flashcards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flashcard])],
  controllers: [FlashcardController],
  providers: [FlashcardService],
})
export class FlashcardsModule {}
