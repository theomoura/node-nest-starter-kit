import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

import { RedisModule } from './redis/redis.module';
import { initMongo } from './mongo/mongo.initialization';
import { CacheModule } from './cache/cache.module';
import { MemoryCacheModule } from './memoryCache/memoryCache.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    initMongo(),
    TasksModule,
    CacheModule,
    MemoryCacheModule,
    RedisModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
