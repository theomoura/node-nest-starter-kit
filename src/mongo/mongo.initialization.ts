import { MongooseModule } from '@nestjs/mongoose';

export function initMongo() {
  return MongooseModule.forRoot(
    'mongodb+srv://admin:<password>@cluster0.y7bzx.mongodb.net/to-do?retryWrites=true&w=majority',
  );
}
