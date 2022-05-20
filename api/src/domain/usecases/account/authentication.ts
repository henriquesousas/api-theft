import { Account } from '../../models/account'

export interface Authentication {
  login (email: string, password: string): Promise<Account|null>
}
