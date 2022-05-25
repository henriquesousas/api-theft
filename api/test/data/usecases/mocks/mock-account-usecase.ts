import { CreateAccount, Authentication } from '../../../../src/controllers/import-protocols'
import { AccountDto } from '../../../../src/domain/dto/account-dto'
import { Account } from '../../../../src/domain/models/account'
import { mockAccountModel } from '../../models/mock-account'

export const mockCreateAccountUseCase = (): CreateAccount => {
  class AddAccountUseCaseStub implements CreateAccount {
    async create(dto: AccountDto): Promise<Account> {
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

export const mockLoginUseCase = (): Authentication => {
  class LoginUseCaseStub implements Authentication {
    async login (email: string, password: string): Promise<Account> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new LoginUseCaseStub()
}
