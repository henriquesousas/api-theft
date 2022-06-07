import { Encrypt } from '../protocols/cryptography/encrypter'
import { HashComparer } from '../protocols/cryptography/hasher-comparer'
import { LoadAccountByEmailRepository } from '../protocols/repository/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../protocols/repository/account/update-access-token-repository'
import { AuthAccountUseCase } from '../../../src/data/usecases/account/auth-account-usecase'
import { Authentication } from '../../domain/usecases/account/authentication'
import { UnauthorizedError } from '../../../src/presentation/helpers/errors/unauthorized-error'
import { mockHasherComparer, mockJwtAdapter } from '../../infra/criptography/mocks'
import { mockUpdateAccessTokenRepository } from '../../infra/repository/mocks/mock-account-repository'
import { Account } from '@/domain/models'

type SutTypes = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
  hasherComparerStub: HashComparer
  jwtAdapterEncrypterStub: Encrypt
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
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const hasherComparerStub = mockHasherComparer()
  const jwtAdapterEncrypterStub = mockJwtAdapter()
  const sut = new AuthAccountUseCase(hasherComparerStub, jwtAdapterEncrypterStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    updateAccessTokenRepositoryStub,
    hasherComparerStub,
    jwtAdapterEncrypterStub
  }
}

describe('AuthAccountUseCase', () => {
  describe('LoadAccountByEmailRepository', () => {
    test('deve chamar LoadAccountByEmailRepository com os valores corretos', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = mockSut()
      const loadAccountSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      await sut.auth('any_email@gmail.com', '123')
      expect(loadAccountSpy).toHaveBeenCalledWith('any_email@gmail.com')
    })

    test('deve lançar uma exception se LoadAccountByEmailRepository throws', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = mockSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const promise = sut.auth('any_email@gmail.com', '123')
      await expect(promise).rejects.toThrow()
    })

    test('deve retornar UnauthorizedError se o LoadAccountByEmailRepository não encontrar uma conta', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = mockSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(null)))
      const promise = sut.auth('any_email@gmail.com', '123')
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
      await sut.auth('any_email', 'any_password')
      expect(hashComparerSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
    })

    test('deve retornar UnauthorizedError se o HashComparer falhar', async () => {
      const { sut, hasherComparerStub } = mockSut()
      jest.spyOn(hasherComparerStub, 'comparer').mockReturnValueOnce(new Promise(resolve => resolve(false)))
      const promise = sut.auth('any_email', 'any_password')
      await expect(promise).rejects.toThrowError(new UnauthorizedError())
    })
  })
})
