import { Account } from '../../../../domain/models/account'

export interface LoadAccountByIdRepository {
  loadById(id: string): Promise<Account|null>
}
