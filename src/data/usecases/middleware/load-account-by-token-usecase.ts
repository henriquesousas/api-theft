import { LoadAccountByToken } from '@/domain/usecases/middleware/load-account-by-token'
import { Decrypt } from '@/data/protocols/cryptography'
import { LoadAccountByIdRepository } from '@/data/protocols/repository/account'
import { UnauthorizedError } from '@/presentation/helpers/errors'

export class LoadAccountByTokenUseCase implements LoadAccountByToken {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly decrypt: Decrypt) { }

  async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    const accountId = await this.decrypt.decrypt(accessToken)
    const account = await this.loadAccountByIdRepository.loadById(accountId)
    if (!account) {
      throw new UnauthorizedError()
    }
    return { account }
  }
}
