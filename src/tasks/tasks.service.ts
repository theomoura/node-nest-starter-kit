import { Injectable } from '@nestjs/common';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CacheIntegration } from '../cache/cache.manager';
import { MongoDao } from '../mongo/mongo.dao';

@Injectable()
export class TasksService extends MongoDao<Task, Task> {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private readonly cacheIntegration: CacheIntegration,
  ) {
    super(taskModel);
  }

  async getAll() {
    return await this.findAll();
  }

  async getById(id: string) {
    // const cachedItem = await this.cacheIntegration.verifyCache(id);
    return await this.findOne({ _id: id });

    // if (!cachedItem) {

    //   await this.cacheIntegration.consumeCache(id, retrivedItem);
    //   return retrivedItem;
    // }
    // return cachedItem;
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
}
