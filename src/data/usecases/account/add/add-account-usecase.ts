import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/repository/account'
import { Hash, Encrypt } from '@/data/protocols/cryptography'
import { AccountDto } from '@/domain/dto'
import { AddAccount } from '@/domain/usecases/account'
import { EmailInUseError } from '@/presentation/helpers/errors'
import { left, right } from '@/presentation/helpers/either'
import { AddAccountResponse } from './add-account-response'

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly hash: Hash,
    private readonly encrypt: Encrypt,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async create(dto: AccountDto): Promise<AddAccountResponse> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(dto.email)
    if (account) {
      return left(new EmailInUseError())
    }
    const hash = await this.hash.hash(dto.password)
    const newDto = Object.assign(dto, { password: hash })
    const newAccount = await this.addAccountRepository.create(newDto)
    const accessToken = await this.encrypt.encrypt(newAccount.id)
    return right({
      accessToken,
      accountId: newAccount.id
    })
  }
}
