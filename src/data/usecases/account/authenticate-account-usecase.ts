import { UnauthorizedError } from '../../../presentation/helpers/errors'
import { Authentication } from '../import-domain'
import { LoadAccountByEmailRepository } from '../import-protocols'
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import { HashComparer } from '../../../data/protocols/cryptography/hasher-comparer'

export class AuthenticateAccountUseCase implements Authentication {
  constructor(
    private readonly hasher: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async auth(email: string, password: string): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) {
      throw new UnauthorizedError()
    }
    const isValid = await this.hasher.comparer(password, account.password)
    if (!isValid) {
      throw new UnauthorizedError()
    }
    const accessToken = await this.encrypter.encrypt(account.id)
    return {
      account,
      accessToken
    }
  }
}
