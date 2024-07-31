import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class FlashcardItemDto {
  @IsString()
  readonly question: string;

  @IsString()
  readonly answer: string;
}

export class CreateFlashcardDto {
  @IsString()
  readonly name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FlashcardItemDto)
  readonly flashcards: FlashcardItemDto[];
}
