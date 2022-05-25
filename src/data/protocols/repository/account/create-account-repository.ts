import { AccountDto } from '../../../../domain/dto/account-dto'
import { Account } from '../../../../domain/models/account'

export interface CreateAccountRepositoy {
  create (dto: AccountDto): Promise<Account>
}
