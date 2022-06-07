import { AddAccountRepository } from '../../../data/protocols/repository/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../src/data/protocols/repository/account/load-account-by-email-repository'
import { LoadAccountByIdRepository } from '../../../../src/data/protocols/repository/account/load-account-by-id-repository'
import { UpdateAccessTokenRepository } from '../../../../src/data/protocols/repository/account/update-access-token-repository'
import { AccountDto } from '../../../../src/domain/dto/account-dto'
import { Account } from '../../../../src/domain/models/account'

export const mockAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
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

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {

    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
