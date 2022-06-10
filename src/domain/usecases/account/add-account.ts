import { AddAccountResponse } from '@/data/usecases/account/add/add-account-response'
import { AccountDto } from '@/domain/dto'

export interface AddAccount {
  create(dto: AccountDto): Promise<AddAccountResponse>
}

export namespace AddAccount {
  export type Result = {
    accessToken: string
    accountId: string
  }
}
