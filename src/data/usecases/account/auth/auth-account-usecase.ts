import { Authentication } from '@/domain/usecases/account/authentication'
import { Encrypt } from '@/data/protocols/cryptography/encrypt'
import { HashComparer } from '@/data/protocols/cryptography/hasher-comparer'
import { UnauthorizedError } from '@/presentation/helpers/errors'
import { LoadAccountByEmailRepository } from '@/data/protocols/repository/account/load-account-by-email-repository'
import { AuthDto } from '@/domain/dto/auth-dto'
import { left, right } from '@/presentation/helpers/either'
import { AuthAccountResponse } from './auth-account-response'

export class AuthAccountUseCase implements Authentication {
  constructor(
    private readonly hash: HashComparer,
    private readonly encrypt: Encrypt,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async auth(authDto: AuthDto): Promise<AuthAccountResponse> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authDto.email)
    if (!account) {
      return left(new UnauthorizedError())
    }
    const isValid = await this.hash.comparer(authDto.password, account.password)
    if (!isValid) {
      return left(new UnauthorizedError())
    }
    const accessToken = await this.encrypt.encrypt(account.id)
    return right({
      accessToken,
      accountId: account.id
    })
  }
}
