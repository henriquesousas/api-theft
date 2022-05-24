import { AccountDto } from '../../dto/account-dto'
import { Account } from '../../models/account'

export interface AddAccount {
  add (dto: AccountDto): Promise<Account>
}
