import { CreateAccount } from '../../../../controllers/import-protocols'
import { CreateAccountUseCase } from '../../../../data/usecases/account/create-account-usecase'
import { BCrypter } from '../../../../infra/criptography/bcrypter'
import { AccountMongoRepositoy } from '../../../../infra/repository/account-mongo-repository'

export const makeAddAccountUseCaseFactory = (): CreateAccount => {
  const salt = 12
  const bcryptHasher = new BCrypter(salt)
  const addAccountRepository = new AccountMongoRepositoy()
  const loadAccountByEmailRepository = new AccountMongoRepositoy()
  return new CreateAccountUseCase(bcryptHasher, addAccountRepository, loadAccountByEmailRepository)
}
