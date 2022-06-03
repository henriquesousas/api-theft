import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Controller } from '../../presentation/protocols/controller'

export const mockBaseController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(request: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: 'any_body'
      }
      return await new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}
