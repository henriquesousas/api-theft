import { Account, Authentication } from '../import-domain'
import { LoadAccountByEmailRepository, HashComparer } from '../import-protocols'

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: HashComparer
  ) { }

  async login(email: string, password: string): Promise<Account | null> {
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
