import { LoginUseCaseImpl } from '../../../data/usecases/login-usecase-impl'
import { LoginUseCase } from '../../../domain/usecases/login-usecase'
import { AccountMongoRepositoy } from '../../../infra/repository/mongo/account-mongo-repository'

export const makeLoginUseCaseFactory = (): LoginUseCase => {
  const loadAccountByEmailRepository = new AccountMongoRepositoy()
  return new LoginUseCaseImpl(loadAccountByEmailRepository)
}
