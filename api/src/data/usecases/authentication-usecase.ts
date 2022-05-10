import { Account } from '../../domain/models/account'
import { Authentication } from '../../domain/usecases/authentication'
import { HashComparer } from '../protocols/cryptography/hasher-comparer'
import { LoadAccountByEmailRepository } from '../protocols/repository/load-account-by-email-repository'

export class AuthenticationUseCase implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: HashComparer
  ) { }

  async login (email: string, password: string): Promise<Account | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      const isValid = await this.hasher.comparer(password, account.password)
      if (!isValid) {
        return null
      }
    }
    return account
  }
}
