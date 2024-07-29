import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client = createClient();

  constructor() {
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.connect();
  }

  async set(key: string, value: string) {
    await this.client.set(key, value);
  }

  async get(key: string) {
    return await this.client.get(key);
  }
}
