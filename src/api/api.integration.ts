import { Method } from 'axios';
import { Inject, HttpService, Injectable } from '@nestjs/common';

export interface APIResponse {
  data: any;
  status: number;
}

@Injectable()
export class ApiIntegration {
  constructor(private readonly httpService: HttpService) {}

  async consumeJsonApiService(
    method: Method,
    address: string,
    body: any = {},
    headers: any = {},
    timeout: number = 10000,
  ): Promise<APIResponse> {
    const updatedHeaders = { ...headers, 'content-type': 'application/json' };

    try {
      const result = await this.httpService
        .request({
          method,
          url: address,
          headers: updatedHeaders,
          timeout,
          data: body,
        })
        .toPromise();

      const _response = result.data;
      const response = { data: _response, status: 200 } as APIResponse;

      return response;
    } catch (error) {
      const status = error.response.status;
      const response = { data: error.response.data, status };
      console.log(response);

      throw error;
    }
  }
}
