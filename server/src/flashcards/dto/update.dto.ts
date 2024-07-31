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

export class UpdateFlashcardDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FlashcardItemDto)
  readonly flashcards?: FlashcardItemDto[];
}
