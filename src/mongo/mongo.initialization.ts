import { MongooseModule } from '@nestjs/mongoose';

export function initMongo() {
  return MongooseModule.forRoot('<your-mongo-uri>');
}
