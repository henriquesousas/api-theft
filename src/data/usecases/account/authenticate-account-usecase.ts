import { Encrypter } from '../../protocols/cryptography/encrypter'
import { UpdateAccessTokenRepository } from '../../protocols/repository/account/update-access-token-repository'
import { Authentication } from '../../../domain/usecases/account/authentication'
import { UnauthorizedError } from '../../../presentation/helpers/errors/unauthorized-error'
import { LoadAccountByEmailRepository, HashComparer } from '../import-protocols'

export class AuthenticateAccountUseCase implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
    private readonly hasher: HashComparer,
    private readonly encrypter: Encrypter
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
