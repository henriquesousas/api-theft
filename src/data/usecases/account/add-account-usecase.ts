import { AccountDto } from '@/domain/dto'
import { Account } from '@/domain/models'
import { AddAccount } from '@/domain/usecases/account'
import { EmailInUseError } from '@/presentation/helpers/errors'
import { Hasher } from '@/data/protocols/cryptography/hasher'
import { AddAccountRepositoy, LoadAccountByEmailRepository } from '@/data/protocols/repository/account'

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepositoy,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async create(dto: AccountDto): Promise<Account> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(dto.email)
    if (account) {
      throw new EmailInUseError()
    }
    const hashedPassword = await this.hasher.hash(dto.password)
    const accountDtoWithHashedPassword = Object.assign(dto, { password: hashedPassword })
    return await this.addAccountRepository.create(accountDtoWithHashedPassword)
  }
}
