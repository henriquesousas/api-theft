import { Controller } from '../../../src/controllers/controller'
import { HttpRequest, HttpResponse } from '../../../src/controllers/import-protocols'

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
