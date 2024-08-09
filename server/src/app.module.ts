import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FlashcardsModule } from './flashcards/flashcard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration available globally
    }),
    AuthModule,
    UserModule,
    FlashcardsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        synchronize: true,
        ssl: {
          rejectUnauthorized: true,
          ca: fs.readFileSync('src/ca.pem').toString(),
        },
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
    }),
  ],
})
export class AppModule {}
