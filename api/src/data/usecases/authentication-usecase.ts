import { Account } from '../../domain/models/account'
import { Authentication } from '../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../protocols/repository/load-account-by-email-repository'

export class AuthenticationUseCase implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async login (email: string, password: string): Promise<Account | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    return account
  }
}
