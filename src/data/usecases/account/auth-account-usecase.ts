import { Authentication } from '@/domain/usecases/account/authentication'
import { Encrypt } from '@/data/protocols/cryptography/encrypt'
import { HashComparer } from '@/data/protocols/cryptography/hasher-comparer'
import { UnauthorizedError } from '@/presentation/helpers/errors'
import { LoadAccountByEmailRepository } from '@/data/protocols/repository/account/load-account-by-email-repository'

export class AuthAccountUseCase implements Authentication {
  constructor(
    private readonly hash: HashComparer,
    private readonly encrypt: Encrypt,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async auth(email: string, password: string): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) {
      throw new UnauthorizedError()
    }
    const isValid = await this.hash.comparer(password, account.password)
    if (!isValid) {
      throw new UnauthorizedError()
    }
    const accessToken = await this.encrypt.encrypt(account.id)
    return {
      account,
      accessToken
    }
  }
}
