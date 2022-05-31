import { AccountDto } from '../../../../domain/dto/account-dto'
import { Account } from '../../../../domain/models/account'

export interface AddAccountRepositoy {
  create (dto: AccountDto): Promise<Account>
}
