import { Injectable } from '@nestjs/common';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CacheIntegration } from '../cache/cache.integration';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private readonly cacheIntegration: CacheIntegration,
  ) {}

  async getAll() {
    return await this.taskModel.find().exec();
  }

  async getById(id: string) {
    const cachedItem = await this.cacheIntegration.verifyCache(id);

    if (!cachedItem) {
      const retrivedItem = await this.taskModel.findById(id).exec();
      await this.cacheIntegration.consumeCache(id, retrivedItem);
      return retrivedItem;
    }
    return cachedItem;
  }

  async create(task: Task) {
    const createdTask = new this.taskModel(task);
    return await createdTask.save();
  }

  async update(task: Task) {
    return this.taskModel.findByIdAndUpdate(task.id, task, { new: true });
  }

  async delete(id: string) {
    return this.taskModel.deleteOne({ _id: id }).exec();
  }
}
