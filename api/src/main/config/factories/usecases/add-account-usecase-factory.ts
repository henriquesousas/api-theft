import { AddAccountUseCase } from '../../../../controllers'
import { AddAccountUseCaseImpl } from '../../../../data/usecases/add-account-usecase-impl'
import { BCrypterHasher } from '../../../../infra/criptography/bcrypter-hasher'
import { AccountMongoRepositoy } from '../../../../infra/repository/mongo/account-mongo-repository'

export const buildAddAccountUseCaseFactory = (): AddAccountUseCase => {
  const salt = 12
  const bcryptHasher = new BCrypterHasher(salt)
  const repository = new AccountMongoRepositoy()
  return new AddAccountUseCaseImpl(bcryptHasher, repository)
}
