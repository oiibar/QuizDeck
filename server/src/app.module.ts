import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardsModule } from './flashcards/flashcards.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FlashcardsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'quizdeck',
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
