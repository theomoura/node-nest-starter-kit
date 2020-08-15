import { RedisDao } from '../redis/redis.dao';
import { Injectable } from '@nestjs/common';
import { MemoryCache } from 'src/memoryCache/memoryCache.service';

export enum CacheType {
  redis,
  memory,
  both,
}

@Injectable()
export class CacheIntegration {
  constructor(
    private readonly redisDao: RedisDao,
    private readonly memoryCache: MemoryCache,
  ) {}

  async consumeCache(key: string): Promise<any> {
    const memoryCacheObject = this.memoryCache.get(key);
    if (!memoryCacheObject) {
      return await this.redisDao.get(key);
    }

    return memoryCacheObject;
  }

  async cacheInto(
    type: CacheType,
    key: string,
    value: any,
    ttl?: number,
  ): Promise<any> {
    switch (type as CacheType) {
      case CacheType.redis: {
        return await this.redisDao.set(key, value, ttl);
      }
      case CacheType.memory: {
        return this.memoryCache.set(key, value);
      }
      case CacheType.both: {
        this.memoryCache.set(key, value);
        return await this.redisDao.set(key, value, ttl);
      }
    }
  }
}
