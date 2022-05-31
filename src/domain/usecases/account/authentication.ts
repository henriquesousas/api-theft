import { Account } from '../../models/account'

export interface Authentication {
  auth (email: string, password: string): Promise<Authentication.Result>
}

export namespace Authentication {
  // export type Params = {
  //   email: string
  //   password: string
  // }

  export type Result = {
    accessToken: string
    account: Account
  }
}
