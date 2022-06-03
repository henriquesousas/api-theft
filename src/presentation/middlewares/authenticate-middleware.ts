
import { Middleware } from '../protocols/middleware'
import { forbidden, sucess } from '../helpers/http/http'
import { AccessDeniedError } from '../helpers/errors/access-denied-error'
import { ErrorFactory } from '../helpers/errors/error-factory'
import { LoadAccountByToken } from '../../domain/usecases/middleware/load-account-by-token'
import { HttpRequest, HttpResponse } from '../protocols'

export class AuthenticateMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = request.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return sucess(account)
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}
