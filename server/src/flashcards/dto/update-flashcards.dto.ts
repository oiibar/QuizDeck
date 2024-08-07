import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class FlashcardDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  answer?: string;
}

export class UpdateFlashcardGroupDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashcardDto)
  flashcards?: FlashcardDto[];
}

export class FlashcardGroupDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  pinned: boolean;

  @IsNotEmpty()
  @IsString()
  description: string;

  createdAt: Date;

  updatedAt: Date;

  flashcards: { question: string; answer: string }[];
}
