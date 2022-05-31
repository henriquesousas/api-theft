
import { AuthenticateMiddleware } from '../../../presentation/middlewares/authenticate-middleware'
import { Middleware } from '../../../presentation/protocols/middleware'
import { makeLoadAccountByTokenUseCaseFactory } from '../usecases/load-account-by-token-usecase-factory'

export const makeAuthMiddlewareFactory = (role?: string): Middleware => {
  return new AuthenticateMiddleware(makeLoadAccountByTokenUseCaseFactory(), role)
}
