import { HttpRequest, HttpResponse } from '../controllers/import-protocols'
import { Middleware } from './middleware'
import { forbidden } from '../helpers/http/http'
import { AccessDeniedError } from '../helpers/erros/access-denied-error'

export class LoginMiddleware implements Middleware {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError())
    return await new Promise(resolve => resolve(error))
  }
}
