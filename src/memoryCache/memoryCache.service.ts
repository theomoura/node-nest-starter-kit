import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryCache {
  private memoryCache = new Map<string, any>();

  set(key: string, value: any): any {
    this.memoryCache.set(key, value);

    return value;
  }

  get(key: string): any {
    const result = this.memoryCache.get(key);

    return result;
  }
}
