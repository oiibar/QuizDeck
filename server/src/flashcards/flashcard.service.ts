import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlashcardGroup } from './entities/flashcards.entity';
import { CreateFlashcardGroupDto } from './dto/create-flashcards.dto';
import { UpdateFlashcardGroupDto } from './dto/update-flashcards.dto';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectRepository(FlashcardGroup)
    private readonly flashcardRepository: Repository<FlashcardGroup>,
  ) {}

  async create(createFlashcardDto: CreateFlashcardGroupDto, id: number) {
    const existingFlashcardGroup = await this.flashcardRepository.findOne({
      where: {
        title: createFlashcardDto.title,
        user: { id },
      },
    });

    if (existingFlashcardGroup) {
      throw new ConflictException(
        'Flashcard group with this title already exists for the user',
      );
    }

    const newFlashcardGroup = this.flashcardRepository.create({
      title: createFlashcardDto.title,
      description: createFlashcardDto.description,
      flashcards: createFlashcardDto.flashcards,
      user: { id },
    });

    return await this.flashcardRepository.save(newFlashcardGroup);
  }

  async findAll(userId: number) {
    return await this.flashcardRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async findOne(id: number) {
    const flashcard = await this.flashcardRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!flashcard) throw new NotFoundException('Flashcard not found!');

    return flashcard;
  }

  async update(id: number, updateFlashcardDto: UpdateFlashcardGroupDto) {
    const flashcardGroup = await this.flashcardRepository.findOne({
      where: { id },
    });

    if (!flashcardGroup) {
      throw new NotFoundException('Flashcard group not found!');
    }

    await this.flashcardRepository.update(id, updateFlashcardDto);

    return { message: 'Flashcards updated successfully' };
  }

  async remove(id: number) {
    const flashcard = await this.flashcardRepository.findOne({
      where: { id },
    });

    if (!flashcard) throw new NotFoundException('Flashcard not found!');

    await this.flashcardRepository.delete(id);

    return { message: 'Flashcards deleted successfully' };
  }

  async removeAll(userId: number) {
    const flashcards = await this.flashcardRepository.find({
      where: {
        user: { id: userId },
      },
    });

    if (!flashcards.length)
      throw new NotFoundException('No flashcards found for the user!');

    await this.flashcardRepository.delete({ user: { id: userId } });
    return { message: 'Deleted all flashcards successfully' };
  }
}
