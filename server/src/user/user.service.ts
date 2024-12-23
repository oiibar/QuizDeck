import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = this.userRepository.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['flashcardGroups'],
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['flashcardGroups'],
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async remove(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException('User not found or already deleted');
    }
    return 'User successfully deleted';
  }

  async updateProfile(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.password) {
      user.password = await argon2.hash(updateUserDto.password);
    }

    return this.userRepository.save(user);
  }
}
