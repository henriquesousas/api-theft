import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import { UpdateAccessTokenRepository } from '../../../data/protocols/repository/account/update-access-token-repository'
import { Authentication } from '../../../domain/usecases/account/authentication'
import { UnauthorizedError } from '../../../helpers/erros/unauthorized-error'
import { LoadAccountByEmailRepository, HashComparer } from '../import-protocols'

export class LoginUseCase implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
    private readonly hasher: HashComparer,
    private readonly encrypter: Encrypter
  ) { }

  async login(email: string, password: string): Promise<Authentication.Result> {
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
      accessToken,
      account
    }
  }
}
