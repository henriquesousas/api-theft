import { Hasher } from '../../../src/data/protocols/cryptography/hasher'
import { AddAccountRepositoy } from '../../../src/data/protocols/repository/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../src/data/protocols/repository/load-account-by-email-repository'
import { AddAccountUseCase } from '../../../src/data/usecases/add-account-usecase'
import { AccountDto } from '../../../src/domain/dto/account-dto'
import { Account } from '../../../src/domain/models/account'
import { BCrypter } from '../../../src/infra/criptography/bcrypter'

interface SutTypes {
  sut: AddAccountUseCase
  addAccountRepositoryStub: AddAccountRepositoy
  loadByEmailRepositoryStub: LoadAccountByEmailRepository
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
    async add(dto: AccountDto): Promise<Account> {
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
    async loadByEmail(email: string): Promise<Account | null> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const salt = 12
  const hasherStub = new BCrypter(salt)
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const loadByEmailRepositoryStub = makeLoadAccountRepositoryStub()
  const sut = new AddAccountUseCase(hasherStub, addAccountRepositoryStub, loadByEmailRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub,
    loadByEmailRepositoryStub,
    hasherStub
  }
}

describe('AddAccountUseCase', () => {
  describe('LoadAccountByEmailRepository', () => {
    test('deve chamar o LoadAccountByEmailRepository com o valor correto', async () => {
      const { sut, loadByEmailRepositoryStub } = makeSut()
      const loadByEmailSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
      const fakeDto = makeFakeDto()
      await sut.add(fakeDto)
      expect(loadByEmailSpy).toHaveBeenCalledWith(fakeDto.email)
    })

    test('deve lançar uma exception se LoadAccountByEmailRepository throws', async () => {
      const { sut, loadByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const fakeDto = makeFakeDto()
      const promise = sut.add(fakeDto)
      await expect(promise).rejects.toThrow()
    })

    test('deve retornar null ao cadastrar uma conta com email existente', async () => {
      const accountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
      const { sut, loadByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(accountModel)))
      const account = await sut.add(makeFakeDto())
      expect(account).toBeNull()
    })
  })

  describe('Hasher', () => {
    test('deve chamar o Hasher com o valor correto', async () => {
      const { sut, hasherStub } = makeSut()
      const hasherSpy = jest.spyOn(hasherStub, 'hash')
      const fakeDto = makeFakeDto()
      await sut.add(fakeDto)
      expect(hasherSpy).toHaveBeenCalledWith('any_password')
    })

    test('deve lançar uma exception se Hasher throws', async () => {
      const { sut, hasherStub } = makeSut()
      jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const promise = sut.add(makeFakeDto())
      await expect(promise).rejects.toThrow()
    })
  })
})
