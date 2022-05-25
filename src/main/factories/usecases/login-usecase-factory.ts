import { LoginUseCase } from '../../../data/usecases/account/login-usecase'
import { Authentication } from '../../../domain/usecases/account/authentication'
import { BCrypter } from '../../../infra/criptography/bcrypter'
import { AccountMongoRepositoy } from '../../../infra/repository/account-mongo-repository'

export const makeLoginUseCaseFactory = (): Authentication => {
  const salt = 12
  const hasher = new BCrypter(salt)
  const loadAccountByEmailRepository = new AccountMongoRepositoy()
  return new LoginUseCase(loadAccountByEmailRepository, hasher)
}
