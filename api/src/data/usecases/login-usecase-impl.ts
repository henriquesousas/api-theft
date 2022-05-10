import { Account } from '../../domain/models/account'
import { LoginUseCase } from '../../domain/usecases/login-usecase'
import { LoadAccountByEmailRepository } from '../protocols/repository/load-account-by-email-repository'

export class LoginUseCaseImpl implements LoginUseCase {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async login (email: string, password: string): Promise<Account | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    return account
  }
}
