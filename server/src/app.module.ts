import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardsModule } from './flashcards/flashcard.module';
import * as fs from 'fs';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FlashcardsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: '123',
      // database: 'quizdeck',
      // entities: [__dirname + '/**/*.entity{.js, .ts}'],
      host: 'quizdeck-quizdeck.l.aivencloud.com',
      port: 20021,
      username: 'avnadmin',
      password: 'AVNS_OTnJxYpuQhI0wYKf7xC',
      database: 'defaultdb',
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('src/ca.pem').toString(),
      },
      synchronize: true,
    }),
  ],
})
export class AppModule {}
