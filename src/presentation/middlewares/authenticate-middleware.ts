import { Middleware, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { success, unauthorized } from '@/presentation/helpers/http/http'
import { ErrorFactory } from '@/presentation/helpers/errors/error-factory'
import { LoadAccountByToken } from '@/domain/usecases/middleware/load-account-by-token'

export class AuthenticateMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = request.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return success(account)
        }
      }
      return unauthorized()
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}
