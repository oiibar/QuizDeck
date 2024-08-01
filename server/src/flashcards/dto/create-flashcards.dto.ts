import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FlashcardDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}

export class CreateFlashcardGroupDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashcardDto)
  flashcards: FlashcardDto[];
}
