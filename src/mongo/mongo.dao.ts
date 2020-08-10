/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* tslint:disable:variable-name */
import { Model, Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export class MongoDao<T extends Document, K extends { _id?: string }> {
  protected model: Model<T>;

  protected constructor(model: Model<T>) {
    this.model = model;
  }

  find(query: any): Promise<T[]> {
    return this.model.find(query).exec();
  }

  findOne(query: any): Promise<T> {
    return this.model.findOne(query).exec();
  }

  findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  // tslint:disable-next-line:variable-name
  findOneById(_id: string): Promise<T> {
    const isValid = this.isObjectIdValid(_id);

    return isValid ? this.model.findOne({ _id } as any).exec() : undefined;
  }

  async create(obj: K): Promise<T> {
    return new this.model(obj).save();
  }

  async createMany(objs: K[]): Promise<any> {
    const bulk = this.model.collection.initializeOrderedBulkOp();

    objs.forEach(obj => bulk.insert(obj));

    return bulk.execute();
  }

  async deleteById(_id: string): Promise<any> {
    return this.model.findOneAndRemove({ _id } as any).exec();
  }

  async update(obj: K): Promise<T> {
    if (obj == null || obj._id == null) {
      throw new HttpException('MongoDaoUpdateError', HttpStatus.BAD_REQUEST);
    }
    const updated = await this.model
      .findOneAndUpdate({ _id: obj._id } as any, { $set: obj } as any, {
        new: true,
      })
      .exec();
    if (!updated) {
      throw new HttpException('MongoDaoUpdateError', HttpStatus.BAD_REQUEST);
    }

    return updated;
  }

  async updateMany(objs: K[]): Promise<any> {
    const bulk = this.model.collection.initializeOrderedBulkOp();

    objs.forEach(obj => {
      // tslint:disable-next-line:variable-name
      const _id = mongoose.Types.ObjectId(obj._id);
      delete obj._id;
      bulk.find({ _id }).update({ $set: obj });
    });

    return bulk.execute();
  }

  isObjectIdValid(objectId: string) {
    return mongoose.Types.ObjectId.isValid(objectId);
  }
}
