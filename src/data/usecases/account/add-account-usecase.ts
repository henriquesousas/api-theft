import { EmailInUseError } from '../../../presentation/helpers/errors/email-in-user-error'
import { AddAccount, Account, AccountDto } from '../import-domain'
import { LoadAccountByEmailRepository, AddAccountRepositoy, Hasher } from '../import-protocols'

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
