import { AccountDto } from '@/domain/dto'
import { AddAccount } from '@/domain/usecases/account'
import { EmailInUseError } from '@/presentation/helpers/errors'
import { Hasher, Encrypter } from '@/data/protocols/cryptography'
import { AddAccountRepositoy, LoadAccountByEmailRepository } from '@/data/protocols/repository/account'

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly jwtEncrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepositoy,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async create(dto: AccountDto): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(dto.email)
    if (account) {
      throw new EmailInUseError()
    }
    const hashedPassword = await this.hasher.hash(dto.password)
    const reassignDtoWithHashedPassword = Object.assign(dto, { password: hashedPassword })
    const newAccount = await this.addAccountRepository.create(reassignDtoWithHashedPassword)
    const accessToken = await this.jwtEncrypter.encrypt(newAccount.id)
    return {
      accessToken,
      account: newAccount
    }
  }
}
