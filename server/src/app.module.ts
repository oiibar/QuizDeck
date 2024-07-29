// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Folder } from './entities/folder.entity';
import { Flashcard } from './entities/flashcard.entity';
import { Library } from './entities/library.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'QuizDeck',
      entities: [User, Library, Folder, Flashcard],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
