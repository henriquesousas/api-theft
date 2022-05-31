import { LoadAccountByTokenUseCase } from '../../../data/usecases/middleware/load-account-by-token-usecase'
import { LoadAccountByToken } from '../../../domain/usecases/middleware/load-account-by-token'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter'
import { AccountMongoRepositoy } from '../../../infra/repository/account-mongo-repository'
import env from '../../../main/config/env'

export const makeLoadAccountByTokenUseCaseFactory = (): LoadAccountByToken => {
  const jwt = new JwtAdapter(env.jwtSecret)
  const loadAccountByIdlRepository = new AccountMongoRepositoy()
  return new LoadAccountByTokenUseCase(loadAccountByIdlRepository, jwt)
}
