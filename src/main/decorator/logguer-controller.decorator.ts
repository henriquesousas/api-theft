import { LogguerRepository } from '@/data/protocols/repository/logguer/logguer-repository'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LogguerControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logguerRepository: LogguerRepository) { }

  async handle(request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logguerRepository.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
