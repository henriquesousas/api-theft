import { AddAccount, Account, AccountDto } from '../import-domain'
import { LoadAccountByEmailRepository, AddAccountRepositoy, Hasher } from '../import-protocols'

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepositoy,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add(dto: AccountDto): Promise<Account | null> {
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