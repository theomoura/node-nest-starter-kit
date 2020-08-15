import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

import { RedisModule } from './redis/redis.module';
import { initMongo } from './mongo/mongo.initialization';
import { CacheModule } from './cache/cache.module';
import { MemoryCacheModule } from './memoryCache/memoryCache.module';

@Module({
  imports: [
    initMongo(),
    TasksModule,
    CacheModule,
    MemoryCacheModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
