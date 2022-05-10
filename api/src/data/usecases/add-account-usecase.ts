import { AccountDto } from '../../domain/dto/account-dto'
import { Account } from '../../domain/models/account'
import { AddAccount } from '../../domain/usecases/add-account'
import { Hasher } from '../protocols/cryptography/hasher'
import { AddAccountRepositoy } from '../protocols/repository/add-account-repository'

export class AddAccountUseCase implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepositoy
  ) {}

  async add (dto: AccountDto): Promise<Account> {
    const hashedPassword = await this.hasher.hash(dto.password)
    const accountDtoWithHashedPassword = Object.assign(dto, { password: hashedPassword })
    const account = await this.addAccountRepository.add(accountDtoWithHashedPassword)
    return account
  }
}
