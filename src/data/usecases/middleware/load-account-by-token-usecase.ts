import { LoadAccountByToken } from '../../../domain/usecases/middleware/load-account-by-token'
import { Decrypter } from '../../../data/protocols/cryptography/decrypter'
import { LoadAccountByIdRepository } from '../../../data/protocols/repository/account/load-account-by-id-repository'
import { UnauthorizedError } from '../../../presentation/helpers/errors/unauthorized-error'

export class LoadAccountByTokenUseCase implements LoadAccountByToken {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly jwtDecrypter: Decrypter) { }

  async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    const accountId = await this.jwtDecrypter.decrypt(accessToken)

    const account = await this.loadAccountByIdRepository.loadById(accountId)

    if (!account) {
      throw new UnauthorizedError()
    }

    return { account }
  }
}
