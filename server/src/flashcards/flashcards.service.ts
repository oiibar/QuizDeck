import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flashcard } from './entities/flashcard.entity';
import { CreateFlashcardDto } from './dto/create.dto';
import { UpdateFlashcardDto } from './dto/update.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectRepository(Flashcard)
    private readonly flashcardRepository: Repository<Flashcard>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createFlashcardDto: CreateFlashcardDto,
    userId: number,
  ): Promise<Flashcard> {
    // Find the user by ID
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Create and save the flashcard
    const flashcard = this.flashcardRepository.create({
      ...createFlashcardDto,
      user, // Associate the flashcard with the user
    });
    return this.flashcardRepository.save(flashcard);
  }

  async findAll(userId: number): Promise<Flashcard[]> {
    return this.flashcardRepository.find({
      where: {
        user: { id: userId }, // Use the user relationship to filter
      },
    });
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

  async remove(id: number, userId: number): Promise<void> {
    // Check if the flashcard belongs to the user
    const flashcard = await this.flashcardRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!flashcard) {
      throw new BadRequestException(
        'Flashcard not found or does not belong to the user',
      );
    }

    await this.flashcardRepository.delete(id);
  }
}
