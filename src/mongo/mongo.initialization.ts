import { MongooseModule } from '@nestjs/mongoose';

export function initMongo() {
  return MongooseModule.forRoot('<mongo-uri>');
}
