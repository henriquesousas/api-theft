import env from '@/main/config/env'
import { LoadAccountByTokenUseCase } from '@/data/usecases/middleware/load-account-by-token-usecase'
import { LoadAccountByToken } from '@/domain/usecases/middleware/load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { AccountMongoRepository } from '../../../../src/infra/repository/account-mongo-repository'

export const makeLoadAccountByTokenUseCaseFactory = (): LoadAccountByToken => {
  const jwt = new JwtAdapter(env.jwtSecret)
  const loadAccountByIdlRepository = new AccountMongoRepository()
  return new LoadAccountByTokenUseCase(loadAccountByIdlRepository, jwt)
}
