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
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: true,
          ca: fs
            .readFileSync(configService.get<string>('DB_SSL_CA_PATH'))
            .toString(),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
