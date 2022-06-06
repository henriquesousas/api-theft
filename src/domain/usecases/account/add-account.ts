import { AccountDto } from '@/domain/dto'
import { Account } from '@/domain/models'

export interface AddAccount {
  create (dto: AccountDto): Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Result = {
    accessToken: string
    account: Account
  }
}
