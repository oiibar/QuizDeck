import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class FlashcardGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

  @Column({ default: false })
  @IsBoolean()
  @IsNotEmpty()
  pinned: boolean;

  @ManyToOne(() => User, (user) => user.flashcardGroups, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('json')
  flashcards: Array<{ question: string; answer: string }>;
}
