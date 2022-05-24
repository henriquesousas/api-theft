import { Hasher } from '../../../src/data/protocols/cryptography/hasher'
import { AddAccountRepositoy } from '../../../src/data/protocols/repository/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../src/data/protocols/repository/account/load-account-by-email-repository'
import { AddAccountUseCase } from '../../../src/data/usecases/account/add-account-usecase'
import { BCrypter } from '../../../src/infra/criptography/bcrypter'
import { mockAddAccountRepositoryStub, mockLoadAccountByEmailRepository } from '../../infra/repository/mocks'
import { mockAccountDto } from '../../domain'
import { mockAccountModel } from '../models/mock-account'
import { EmailInUseError } from '../../../src/helpers/erros/email-in-user-error'

type SutTypes = {
  sut: AddAccountUseCase
  addAccountRepositoryStub: AddAccountRepositoy
  loadByEmailRepositoryStub: LoadAccountByEmailRepository
  hasherStub: Hasher
}

const mockSut = (): SutTypes => {
  const salt = 12
  const hasherStub = new BCrypter(salt)
  const addAccountRepositoryStub = mockAddAccountRepositoryStub()
  const loadByEmailRepositoryStub = mockLoadAccountByEmailRepository()
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
      const { sut, loadByEmailRepositoryStub } = mockSut()
      const loadByEmailSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
      const fakeDto = mockAccountDto()
      await sut.add(fakeDto)
      expect(loadByEmailSpy).toHaveBeenCalledWith(fakeDto.email)
    })

    test('deve lançar uma exception se LoadAccountByEmailRepository throws', async () => {
      const { sut, loadByEmailRepositoryStub } = mockSut()
      jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const fakeDto = mockAccountDto()
      const promise = sut.add(fakeDto)
      await expect(promise).rejects.toThrow()
    })

    test('deve lançar um error (EmailInUseError) se LoadAccountByEmailRepository tentar cadastrar uma conta com email existente', async () => {
      const { sut, loadByEmailRepositoryStub } = mockSut()
      jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
      const promise = sut.add(mockAccountDto())
      await expect(promise).rejects.toThrowError(new EmailInUseError())
    })
  })

  describe('Hasher', () => {
    test('deve chamar o Hasher com o valor correto', async () => {
      const { sut, hasherStub } = mockSut()
      const hasherSpy = jest.spyOn(hasherStub, 'hash')
      const accountDto = mockAccountDto()
      await sut.add(accountDto)
      expect(hasherSpy).toHaveBeenCalledWith('any_password')
    })

    test('deve lançar uma exception se Hasher throws', async () => {
      const { sut, hasherStub } = mockSut()
      jest.spyOn(hasherStub, 'hash').mockImplementationOnce(async () => await Promise.reject(new Error()))
      const promise = sut.add(mockAccountDto())
      await expect(promise).rejects.toThrow()
    })
  })
})
