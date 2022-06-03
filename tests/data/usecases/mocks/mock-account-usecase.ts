
import { AddAccount, Authentication } from '@/domain/usecases/account'
import { AccountDto } from '../../../../src/domain/dto/account-dto'
import { Account } from '../../../../src/domain/models/account'
import { mockAccountModel } from '../../models/mock-account'

export const mockCreateAccountUseCase = (): AddAccount => {
  class AddAccountUseCaseStub implements AddAccount {
    async create(dto: AccountDto): Promise<AddAccount.Result> {
      const account: Account = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
      return {
        accessToken: 'any_token',
        account
      }
    }
  }
  return new AddAccountUseCaseStub()
}

export const mockLoginUseCase = (): Authentication => {
  class LoginUseCaseStub implements Authentication {
    async auth(email: string, password: string): Promise<Authentication.Result> {
      return {
        accessToken: 'any_token',
        account: mockAccountModel()
      }
    }
  }
  return new LoginUseCaseStub()
}
