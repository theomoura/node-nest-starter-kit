import { Injectable } from '@nestjs/common';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CacheIntegration, CacheType } from '../cache/cache.integration';
import { MongoDao } from '../mongo/mongo.dao';
import { ApiIntegration } from '../api/api.integration';

@Injectable()
export class TasksService extends MongoDao<Task, Task> {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private readonly cacheIntegration: CacheIntegration,
    private readonly apiIntegration: ApiIntegration,
  ) {
    super(taskModel);
  }

  async getAll() {
    return await this.findAll();
  }

  async getById(id: string) {
    const cachedItem = await this.cacheIntegration.consumeCache(id);
    // return await this.findOne({ _id: id });

    if (!cachedItem) {
      const retrivedItem = await this.findOne({ _id: id });
      await this.cacheIntegration.cacheInto(CacheType.redis, id, retrivedItem);
      return retrivedItem;
    }
    return cachedItem;
  }

  async createTask(task: Task) {
    return await this.create(task);
  }

  async updateTask(task: Task) {
    return await this.update(task);
  }

  async delete(id: string) {
    return this.deleteById(id);
  }

  async getUsers() {
    return this.apiIntegration.consumeJsonApiService(
      'GET',
      'https://jsonplaceholder.typicode.com/users',
    );
  }
}
