import { Controller } from '../../../controllers/controller'
import { HttpRequest, HttpResponse } from '../../../controllers/import-protocols'
import { LogguerRepository } from '../../../data/protocols/repository/logguer-repository'

export class LogguerControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logguerRepository: LogguerRepository) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logguerRepository.log(httpResponse.body.stack)
    }

    return httpResponse
  }
}
