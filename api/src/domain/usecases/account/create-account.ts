import { AccountDto } from '../../dto/account-dto'
import { Account } from '../../models/account'

export interface CreateAccount {
  create (dto: AccountDto): Promise<Account>
}
