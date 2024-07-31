import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flashcard } from './entities/flashcard.entity';
import { CreateFlashcardDto } from './dto/create.dto';
import { UpdateFlashcardDto } from './dto/update.dto';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectRepository(Flashcard)
    private readonly flashcardRepository: Repository<Flashcard>,
  ) {}

  async create(createFlashcardDto: CreateFlashcardDto): Promise<Flashcard> {
    const flashcard = this.flashcardRepository.create(createFlashcardDto);
    return this.flashcardRepository.save(flashcard);
  }

  async findAll(): Promise<Flashcard[]> {
    return this.flashcardRepository.find();
  }

  async findOne(id: number): Promise<Flashcard | null> {
    return this.flashcardRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateFlashcardDto: UpdateFlashcardDto,
  ): Promise<Flashcard | null> {
    await this.flashcardRepository.update(id, updateFlashcardDto);
    return this.flashcardRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.flashcardRepository.delete(id);
  }
}
