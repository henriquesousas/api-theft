import { UnauthorizedError } from '../../../helpers/erros/unauthorized-error'
import { Account, Authentication } from '../import-domain'
import { LoadAccountByEmailRepository, HashComparer } from '../import-protocols'

export class LoginUseCase implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: HashComparer
  ) { }

  async login(email: string, password: string): Promise<Account> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) {
      throw new UnauthorizedError()
    }
    const isValid = await this.hasher.comparer(password, account.password)
    if (!isValid) {
      throw new UnauthorizedError()
    }
    return account
  }
}
