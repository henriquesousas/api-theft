import { Hash } from '@/data/protocols/cryptography/hash'
import { AddAccountRepository } from '../protocols/repository/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../src/data/protocols/repository/account/load-account-by-email-repository'
import { AddAccountUseCase } from './account/add/add-account-usecase'
import { EmailInUseError } from '../../../src/presentation/helpers/errors/email-in-user-error'
import { BCrypter } from '../../../src/infra/criptography/bcrypter'
import { mockAddAccountRepositoryStub, mockLoadAccountByEmailRepository } from '../../infra/repository/mocks'
import { mockAccountDto } from '../../domain'
import { mockAccountModel } from '../models/mock-account'
import { JwtAdapter } from '@/infra/criptography'

type SutTypes = {
  sut: AddAccountUseCase
  addAccountRepositoryStub: AddAccountRepository
  loadByEmailRepositoryStub: LoadAccountByEmailRepository
  hasherStub: Hash
}

const mockSut = (): SutTypes => {
  const salt = 12
  const hasherStub = new BCrypter(salt)
  const jwtAdapter = new JwtAdapter('secrete')
  const addAccountRepositoryStub = mockAddAccountRepositoryStub()
  const loadByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new AddAccountUseCase(hasherStub, jwtAdapter, addAccountRepositoryStub, loadByEmailRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub,
    loadByEmailRepositoryStub,
    hasherStub
  }
}

describe('AddAccountUseCase', () => {
  describe('LoadAccountByEmailRepository', () => {
    test('Deve chamar o LoadAccountByEmailRepository com o valor correto', async () => {
      const { sut, loadByEmailRepositoryStub } = mockSut()
      const loadByEmailSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
      const accountDto = mockAccountDto()
      await sut.create(accountDto)
      expect(loadByEmailSpy).toHaveBeenCalledWith('any_email')
    })

    test('Deve lançar uma exception se LoadAccountByEmailRepository throws', async () => {
      const { sut, loadByEmailRepositoryStub } = mockSut()
      jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const fakeDto = mockAccountDto()
      const promise = sut.create(fakeDto)
      await expect(promise).rejects.toThrow()
    })

    test('Deve lançar um error (EmailInUseError) se LoadAccountByEmailRepository tentar cadastrar uma conta com email existente', async () => {
      const { sut, loadByEmailRepositoryStub } = mockSut()
      jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
      const promise = sut.create(mockAccountDto())
      await expect(promise).rejects.toThrowError(new EmailInUseError())
    })
  })

  describe('Hasher', () => {
    test('deve chamar o Hasher com o valor correto', async () => {
      const { sut, hasherStub } = mockSut()
      const hasherSpy = jest.spyOn(hasherStub, 'hash')
      const accountDto = mockAccountDto()
      await sut.create(accountDto)
      expect(hasherSpy).toHaveBeenCalledWith('any_password')
    })

    test('deve lançar uma exception se Hasher throws', async () => {
      const { sut, hasherStub } = mockSut()
      jest.spyOn(hasherStub, 'hash').mockImplementationOnce(async () => await Promise.reject(new Error()))
      const promise = sut.create(mockAccountDto())
      await expect(promise).rejects.toThrow()
    })
  })
})
