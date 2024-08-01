import { Module } from '@nestjs/common';
import { FlashcardController } from './flashcard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardGroup } from './entities/flashcards.entity';
import { FlashcardService } from './flashcard.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlashcardGroup])],
  controllers: [FlashcardController],
  providers: [FlashcardService],
})
export class FlashcardsModule {}
