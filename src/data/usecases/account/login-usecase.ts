import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import { UpdateAccessTokenRepository } from '../../../data/protocols/repository/account/update-access-token-repository'
import { Authentication } from '../../../domain/usecases/account/authentication'
import { UnauthorizedError } from '../../../helpers/erros/unauthorized-error'
import { Account } from '../import-domain'
import { LoadAccountByEmailRepository, HashComparer } from '../import-protocols'

export class LoginUseCase implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
    private readonly hasher: HashComparer,
    private readonly encrypter: Encrypter
  ) { }

  // TODO: return an account and token
  async login(email: string, password: string): Promise<Account> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) {
      throw new UnauthorizedError()
    }
    const isValid = await this.hasher.comparer(password, account.password)
    if (!isValid) {
      throw new UnauthorizedError()
    }
    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
    return account
  }
}
