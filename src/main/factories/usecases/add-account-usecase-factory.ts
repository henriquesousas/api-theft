import { AddAccount } from '@/domain/usecases/account/add-account'
import { AddAccountUseCase } from '@/data/usecases/account/add-account-usecase'
import { BCrypter } from '@/infra/criptography/bcrypter'
import { AccountMongoRepository } from '../../../../src/infra/repository/account-mongo-repository'
import { JwtAdapter } from '@/infra/criptography'
import env from '@/main/config/env'

export const makeCreateAccounttUseCaseFactory = (): AddAccount => {
  const salt = 12
  const bcrypter = new BCrypter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const addAccountRepository = new AccountMongoRepository()
  const loadAccountByEmailRepository = new AccountMongoRepository()
  return new AddAccountUseCase(bcrypter, jwtAdapter, addAccountRepository, loadAccountByEmailRepository)
}
