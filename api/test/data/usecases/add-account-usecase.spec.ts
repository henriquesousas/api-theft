import { AddAccountRepositoy } from '../../../src/data/protocols/repository/add-account-repository'
import { AddAccountUseCaseImpl } from '../../../src/data/usecases/add-account-usecase-impl'
import { AccountDto } from '../../../src/domain/dto/account-dto'
import { Account } from '../../../src/domain/models/account'
import { BCrypterHasher } from '../../../src/infra/criptography/bcrypter-hasher'

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
    const hasherPassword = new BCrypterHasher(salt)
    const accountRepository = buildAddAccountRepositoryStub()
    const sut = new AddAccountUseCaseImpl(hasherPassword, accountRepository)
    const hasherSpy = jest.spyOn(hasherPassword, 'hash')
    await sut.add(accountDto)
    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })
})
