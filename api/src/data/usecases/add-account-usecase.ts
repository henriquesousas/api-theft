import { AccountDto } from '../../domain/dto/account-dto'
import { Account } from '../../domain/models/account'
import { AddAccount } from '../../domain/usecases/add-account'
import { Hasher } from '../protocols/cryptography/hasher'
import { AddAccountRepositoy } from '../protocols/repository/add-account-repository'
import { LoadAccountByEmailRepository } from '../protocols/repository/load-account-by-email-repository'

export class AddAccountUseCase implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepositoy,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (dto: AccountDto): Promise<Account | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(dto.email)
    if (account) {
      return null
    }
    const hashedPassword = await this.hasher.hash(dto.password)
    const accountDtoWithHashedPassword = Object.assign(dto, { password: hashedPassword })
    const newAccount = await this.addAccountRepository.add(accountDtoWithHashedPassword)
    return newAccount
  }
}
