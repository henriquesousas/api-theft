
import { AuthenticateMiddleware } from '@/presentation/middlewares/authenticate-middleware'
import { Middleware } from '@/presentation/protocols/middleware'
import { makeLoadAccountByTokenUseCaseFactory } from '@/main/factories/usecases/load-account-by-token-usecase-factory'

export const makeAuthMiddlewareFactory = (role?: string): Middleware => {
  return new AuthenticateMiddleware(makeLoadAccountByTokenUseCaseFactory(), role)
}
