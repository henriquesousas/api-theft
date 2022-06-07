import { LogRepository } from '@/data/protocols/repository/logguer/log-repository'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logRepository: LogRepository) { }

  async handle(request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logRepository.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
