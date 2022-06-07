import { AccountDto } from '@/domain/dto'
import { AddAccount } from '@/domain/usecases/account'
import { EmailInUseError } from '@/presentation/helpers/errors'
import { Hash, Encrypt } from '@/data/protocols/cryptography'
import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/repository/account'

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly hash: Hash,
    private readonly encrypt: Encrypt,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async create(dto: AccountDto): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(dto.email)
    if (account) {
      throw new EmailInUseError()
    }
    const hashedPassword = await this.hash.hash(dto.password)
    const reassignDtoWithHashedPassword = Object.assign(dto, { password: hashedPassword })
    const newAccount = await this.addAccountRepository.create(reassignDtoWithHashedPassword)
    const accessToken = await this.encrypt.encrypt(newAccount.id)
    return {
      accessToken,
      account: newAccount
    }
  }
}
