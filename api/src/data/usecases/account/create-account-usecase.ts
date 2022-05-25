import { EmailInUseError } from '../../../helpers/erros/email-in-user-error'
import { CreateAccount, Account, AccountDto } from '../import-domain'
import { LoadAccountByEmailRepository, CreateAccountRepositoy, Hasher } from '../import-protocols'

export class CreateAccountUseCase implements CreateAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly createAccountRepository: CreateAccountRepositoy,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async create(dto: AccountDto): Promise<Account> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(dto.email)
    if (account) {
      throw new EmailInUseError()
    }
    const hashedPassword = await this.hasher.hash(dto.password)
    const accountDtoWithHashedPassword = Object.assign(dto, { password: hashedPassword })
    return await this.createAccountRepository.create(accountDtoWithHashedPassword)
  }
}
