import { AuthAccountResponse } from '@/data/usecases/account/auth/auth-account-response'
import { AuthDto } from '@/domain/dto'

export interface Authentication {
  auth(auth: AuthDto): Promise<AuthAccountResponse>
}

export namespace Authentication {
  export type Result = {
    accessToken: string
    accountId: string
  }
}
