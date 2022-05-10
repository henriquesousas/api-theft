import { Account } from '../models/account'

export interface LoginUseCase {
  login (email: string, password: string): Promise<Account|null>
}
