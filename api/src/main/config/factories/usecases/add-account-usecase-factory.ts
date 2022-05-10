import { AddAccount } from '../../../../controllers'
import { AddAccountUseCase } from '../../../../data/usecases/add-account-usecase'
import { BCrypterHasher } from '../../../../infra/criptography/bcrypter-hasher'
import { AccountMongoRepositoy } from '../../../../infra/repository/mongo/account-mongo-repository'

export const buildAddAccountUseCaseFactory = (): AddAccount => {
  const salt = 12
  const bcryptHasher = new BCrypterHasher(salt)
  const repository = new AccountMongoRepositoy()
  return new AddAccountUseCase(bcryptHasher, repository)
}
