import { AddAccount, Authentication } from '../../../../src/controllers/import-protocols'
import { AccountDto } from '../../../../src/domain/dto/account-dto'
import { Account } from '../../../../src/domain/models/account'

export const mockAddAccountUseCase = (): AddAccount => {
  class AddAccountUseCaseStub implements AddAccount {
    async add(dto: AccountDto): Promise<Account> {
      const account: Account = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
      return account
    }
  }
  return new AddAccountUseCaseStub()
}

export const mockAuthenticateUseCase = (): Authentication => {
  class LoginUseCaseStub implements Authentication {
    async login (email: string, password: string): Promise<Account | null> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoginUseCaseStub()
}
