import { AddAccount } from '../../../../controllers/import-protocols'
import { AddAccountUseCase } from '../../../../data/usecases/add-account-usecase'
import { BCrypter } from '../../../../infra/criptography/bcrypter'
import { AccountMongoRepositoy } from '../../../../infra/repository/account-mongo-repository'

export const makeAddAccountUseCaseFactory = (): AddAccount => {
  const salt = 12
  const bcryptHasher = new BCrypter(salt)
  const addAccountRepository = new AccountMongoRepositoy()
  const loadAccountByEmailRepository = new AccountMongoRepositoy()
  return new AddAccountUseCase(bcryptHasher, addAccountRepository, loadAccountByEmailRepository)
}
