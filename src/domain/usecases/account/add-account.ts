import { AccountDto } from '../../dto/account-dto'
import { Account } from '../../models/account'

export interface AddAccount {
  create (dto: AccountDto): Promise<Account>
}
