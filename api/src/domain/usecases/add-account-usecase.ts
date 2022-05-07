import { AccountDto } from '../dto/account-dto'
import { Account } from '../models/account'

export interface AddAccountUseCase {
  add (dto: AccountDto): Promise<Account>
}
