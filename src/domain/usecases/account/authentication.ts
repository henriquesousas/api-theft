import { Account } from '@/domain/models/account'

export interface Authentication {
  auth (email: string, password: string): Promise<Authentication.Result>
}

export namespace Authentication {
  export type Result = {
    accessToken: string
    account: Account
  }
}
