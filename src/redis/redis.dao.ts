import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class RedisDao {
  constructor(private readonly redisService: RedisService) {}

  private MINUTE: number = 60;

  async get(key: string): Promise<any> {
    const client = await this.redisService.getClient();
    return client.get(key);
  }

  async set(key: string, value: any, ttl: number = this.MINUTE): Promise<any> {
    const client = await this.redisService.getClient();
    await client.set(key, JSON.stringify(value), 'EX', ttl);
    return value;
  }
}
