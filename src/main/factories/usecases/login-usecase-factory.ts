import { JwtAdapter } from '../../../infra/criptography/jwt-adapter'
import { AuthenticateAccountUseCase } from '../../../data/usecases/account/authenticate-account-usecase'
import { Authentication } from '../../../domain/usecases/account/authentication'
import { BCrypter } from '../../../infra/criptography/bcrypter'
import { AccountMongoRepositoy } from '../../../infra/repository/account-mongo-repository'
import env from '../../../main/config/env'

export const makeLoginUseCaseFactory = (): Authentication => {
  const salt = 12
  const hasher = new BCrypter(salt)
  const encrypter = new JwtAdapter(env.jwtSecret)
  const loadAccountByEmailRepository = new AccountMongoRepositoy()
  return new AuthenticateAccountUseCase(hasher, encrypter, loadAccountByEmailRepository)
}
