import { AddAccountRepositoy } from '../../../src/data/protocols/repository/add-account-repository'
import { AddAccountUseCase } from '../../../src/data/usecases/add-account-usecase'
import { AccountDto } from '../../../src/domain/dto/account-dto'
import { Account } from '../../../src/domain/models/account'
import { BCrypter } from '../../../src/infra/criptography/bcrypter'

// const buildAddAccountUseCaseStub = (): AddAccountUseCase => {
//   class AddAccountUseCaseStub implements AddAccountUseCase {
//     async add (dto: AccountDto): Promise<Account> {
//       const account: Account = {
//         id: 'any_id',
//         name: 'any_name',
//         email: 'any_email',
//         password: 'any_password'
//       }
//       return await new Promise(resolve => resolve(account))
//     }
//   }
//   return new AddAccountUseCaseStub()
// }

const buildAddAccountRepositoryStub = (): AddAccountRepositoy => {
  class AddAccountRepositoryStub implements AddAccountRepositoy {
    async add (dto: AccountDto): Promise<Account> {
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

describe('AddAccountUseCase', () => {
  test('deve chamar o Hasher com o valor correto', async () => {
    const accountDto: AccountDto = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const salt = 12
    const hasherPassword = new BCrypter(salt)
    const accountRepository = buildAddAccountRepositoryStub()
    const sut = new AddAccountUseCase(hasherPassword, accountRepository)
    const hasherSpy = jest.spyOn(hasherPassword, 'hash')
    await sut.add(accountDto)
    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })
})
