import { AddAccount } from '@/domain/usecases/account/add-account'
import { AddAccountUseCase } from '@/data/usecases/account/add-account-usecase'
import { BCrypter } from '@/infra/criptography/bcrypter'
import { AccountMongoRepositoy } from '../../../../src/infra/repository/account-mongo-repository'

export const makeCreateAccounttUseCaseFactory = (): AddAccount => {
  const salt = 12
  const bcrypter = new BCrypter(salt)
  const addAccountRepository = new AccountMongoRepositoy()
  const loadAccountByEmailRepository = new AccountMongoRepositoy()
  return new AddAccountUseCase(bcrypter, addAccountRepository, loadAccountByEmailRepository)
}
