import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { AuthAccountUseCase } from '@/data/usecases/account/auth/auth-account-usecase'
import { Authentication } from '@/domain/usecases/account/authentication'
import { BCrypter } from '@/infra/criptography/bcrypter'
import { AccountMongoRepository } from '@/infra/repository/account-mongo-repository'
import env from '../../config/env'

export const makeAuthUseCaseFactory = (): Authentication => {
  const salt = 12
  const hasher = new BCrypter(salt)
  const encrypter = new JwtAdapter(env.jwtSecret)
  const loadAccountByEmailRepository = new AccountMongoRepository()
  return new AuthAccountUseCase(hasher, encrypter, loadAccountByEmailRepository)
}
