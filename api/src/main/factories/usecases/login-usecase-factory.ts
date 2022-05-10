import { AuthenticationUseCase } from '../../../data/usecases/authentication-usecase'
import { Authentication } from '../../../domain/usecases/authentication'
import { AccountMongoRepositoy } from '../../../infra/repository/mongo/account-mongo-repository'

export const makeLoginUseCaseFactory = (): Authentication => {
  const loadAccountByEmailRepository = new AccountMongoRepositoy()
  return new AuthenticationUseCase(loadAccountByEmailRepository)
}
