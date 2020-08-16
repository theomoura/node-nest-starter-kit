import { Module, Global, HttpModule } from '@nestjs/common';
import { ApiIntegration } from './api.integration';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ApiIntegration],
  exports: [ApiIntegration],
})
export class ApiModule {}
