import { HttpRequest, HttpResponse } from '../controllers/import-protocols'
import { Middleware } from './middleware'
import { forbidden } from '../helpers/http/http'
import { AccessDeniedError } from '../helpers/erros/access-denied-error'
import { ErrorFactory } from '../helpers/erros/factory/error-factory'
import { LoadAccountByToken } from 'domain/usecases/middleware/load-account-by-token'

export class LoginMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = request.headers?.['x-access-token']
      if (accessToken) {
        await this.loadAccountByToken.load(accessToken, this.role)
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}
