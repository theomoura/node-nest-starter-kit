import { Module, Global } from '@nestjs/common';
import { RedisModule as RedisInit } from 'nestjs-redis';
import redisOptions from './redis.config';
import { RedisDao } from './redis.dao';

@Module({
  imports: [RedisInit.register(redisOptions)],
  providers: [RedisDao],
  exports: [RedisDao],
})
export class RedisModule {}
