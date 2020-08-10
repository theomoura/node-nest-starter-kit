import { Module, Global } from '@nestjs/common';

import { CacheIntegration } from './cache.manager';
import { RedisModule } from '../redis/redis.module';

@Global()
@Module({
  imports: [RedisModule],
  providers: [CacheIntegration],
  exports: [CacheIntegration],
})
export class CacheModule {}
