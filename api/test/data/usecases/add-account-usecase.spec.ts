import { Hasher } from '../../../src/data/protocols/cryptography/hasher'
import { HashComparer } from '../../../src/data/protocols/cryptography/hasher-comparer'
import { AddAccountRepositoy } from '../../../src/data/protocols/repository/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../src/data/protocols/repository/load-account-by-email-repository'
import { AddAccountUseCase } from '../../../src/data/usecases/add-account-usecase'
import { AccountDto } from '../../../src/domain/dto/account-dto'
import { Account } from '../../../src/domain/models/account'
import { BCrypter } from '../../../src/infra/criptography/bcrypter'

interface SutTypes {
  sut: AddAccountUseCase
  addAccountRepositoryStub: AddAccountRepositoy
  loadAccountRepositoryStub: LoadAccountByEmailRepository
  hasherStub: Hasher
}

const makeFakeDto = (): AccountDto => {
  return {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
}

const makeAddAccountRepositoryStub = (): AddAccountRepositoy => {
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

const makeLoadAccountRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<Account | null> {
      // return {
      //   id: 'any_id',
      //   name: 'any_name',
      //   email: 'any_email',
      //   password: 'any_password'
      // }
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const salt = 12
  const hasherStub = new BCrypter(salt)
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const loadAccountRepositoryStub = makeLoadAccountRepositoryStub()
  const sut = new AddAccountUseCase(hasherStub, addAccountRepositoryStub, loadAccountRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub,
    loadAccountRepositoryStub,
    hasherStub
  }
}

describe('AddAccountUseCase', () => {
  test('deve chamar o Hasher com o valor correto', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeDto())
    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })

  test('deve chamar o LoadAccountEmailRepository com o valor correto', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    const loadEmailSpy = jest.spyOn(loadAccountRepositoryStub, 'loadByEmail')
    await sut.add(makeFakeDto())
    expect(loadEmailSpy).toHaveBeenCalledWith('any_email')
  })

  test('deve retornar null ao cadastrar uma conta com email existente', async () => {
    const accountModel = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(accountModel)))
    const account = await sut.add(makeFakeDto())
    expect(account).toBeNull()
  })
})
