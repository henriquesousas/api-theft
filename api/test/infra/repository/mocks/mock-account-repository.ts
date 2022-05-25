import { CreateAccountRepositoy } from '../../../../src/data/protocols/repository/account/create-account-repository'
import { LoadAccountByEmailRepository } from '../../../../src/data/protocols/repository/account/load-account-by-email-repository'
import { LoadAccountByIdRepository } from '../../../../src/data/protocols/repository/account/load-account-by-id-repository'
import { AccountDto } from '../../../../src/domain/dto/account-dto'
import { Account } from '../../../../src/domain/models/account'

export const mockAddAccountRepositoryStub = (): CreateAccountRepositoy => {
  class AddAccountRepositoryStub implements CreateAccountRepositoy {
    async create(dto: AccountDto): Promise<Account> {
      const account: Account = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
      return await new Promise(resolve => resolve(account))
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<Account | null> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById(id: string): Promise<Account> {
      const account: Account = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
      return await new Promise(resolve => resolve(account))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}
