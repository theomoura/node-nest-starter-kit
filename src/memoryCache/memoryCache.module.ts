import { Module, Global } from '@nestjs/common';
import { MemoryCache } from './memoryCache.service';

@Global()
@Module({
  imports: [],
  providers: [MemoryCache],
  exports: [MemoryCache],
})
export class MemoryCacheModule {}
