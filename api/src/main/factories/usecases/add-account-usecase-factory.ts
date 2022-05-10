import { AddAccountUseCase } from '../../../controllers'
import { AddAccountUseCaseImpl } from '../../../data/usecases/add-account-usecase-impl'
import { BCrypterHasher } from '../../../infra/criptography/bcrypter-hasher'
import { AccountMongoRepositoy } from '../../../infra/repository/mongo/account-mongo-repository'

export const makeAddAccountUseCaseFactory = (): AddAccountUseCase => {
  const salt = 12
  const bcryptHasher = new BCrypterHasher(salt)
  const addAccountRepository = new AccountMongoRepositoy()
  const loadAccountByEmailRepository = new AccountMongoRepositoy()
  return new AddAccountUseCaseImpl(bcryptHasher, addAccountRepository, loadAccountByEmailRepository)
}
