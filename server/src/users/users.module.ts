// users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // Ensure it is exported
})
export class UsersModule {}