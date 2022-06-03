import { AccountDto } from '../../dto/account-dto'
import { Account } from '../../models/account'

export interface AddAccount {
  create (dto: AccountDto): Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Result = {
    accessToken: string
    account: Account
  }
}
