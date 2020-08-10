import { RedisDao } from '../redis/redis.dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheIntegration {
  constructor(private readonly redisDao: RedisDao) {}

  async verifyCache(key: string): Promise<any> {
    return await this.redisDao.get(key);
  }

  async consumeCache(key: string, value: any, ttl?: number): Promise<any> {
    return await this.redisDao.set(key, value, ttl);
  }
}
