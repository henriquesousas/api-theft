import { HashComparer } from '../../../src/data/protocols/cryptography/hasher-comparer'
import { LoadAccountByEmailRepository } from '../../../src/data/protocols/repository/account/load-account-by-email-repository'
import { LoginUseCase } from '../../../src/data/usecases/account/login-usecase'
import { Account } from '../../../src/domain/models/account'
import { Authentication } from '../../../src/domain/usecases/account/authentication'
import { UnauthorizedError } from '../../../src/helpers/erros/unauthorized-error'
import { mockHasherComparer } from '../../infra/criptography/mocks'

type SutTypes = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hasherComparerStub: HashComparer
}

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<Account | null> {
      return {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'hashed_password'
      }
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const mockSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hasherComparerStub = mockHasherComparer()
  const sut = new LoginUseCase(loadAccountByEmailRepositoryStub, hasherComparerStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hasherComparerStub
  }
}

describe('LoginUseCase', () => {
  describe('LoadAccountByEmailRepository', () => {
    test('deve chamar LoadAccountByEmailRepository com os valores corretos', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = mockSut()
      const loadAccountSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      await sut.login('any_email@gmail.com', '123')
      expect(loadAccountSpy).toHaveBeenCalledWith('any_email@gmail.com')
    })

    test('deve lançar uma exception se LoadAccountByEmailRepository throws', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = mockSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const promise = sut.login('any_email@gmail.com', '123')
      await expect(promise).rejects.toThrow()
    })

    test('deve retornar UnauthorizedError se o LoadAccountByEmailRepository não encontrar uma conta', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = mockSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(null)))
      const promise = sut.login('any_email@gmail.com', '123')
      await expect(promise).rejects.toThrowError(new UnauthorizedError())
    })
  })

  describe('HashComparer', () => {
    test('deve chamar HashComparer com os valores corretos', async () => {
      const { sut, hasherComparerStub, loadAccountByEmailRepositoryStub } = mockSut()

      const account = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'hashed_password'
      }

      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(new Promise(resolve => resolve(account)))
      const hashComparerSpy = jest.spyOn(hasherComparerStub, 'comparer')
      await sut.login('any_email', 'any_password')
      expect(hashComparerSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
    })

    test('deve retornar UnauthorizedError se o HashComparer falhar', async () => {
      const { sut, hasherComparerStub } = mockSut()
      jest.spyOn(hasherComparerStub, 'comparer').mockReturnValueOnce(new Promise(resolve => resolve(false)))
      const promise = sut.login('any_email', 'any_password')
      await expect(promise).rejects.toThrowError(new UnauthorizedError())
    })
  })
})
