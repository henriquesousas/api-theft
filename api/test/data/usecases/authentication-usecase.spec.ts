
import { HashComparer } from '../../../src/data/protocols/cryptography/hasher-comparer'
import { LoadAccountByEmailRepository } from '../../../src/data/protocols/repository/load-account-by-email-repository'
import { AuthenticationUseCase } from '../../../src/data/usecases/authentication-usecase'
import { Account } from '../../../src/domain/models/account'
import { Authentication } from '../../../src/domain/usecases/authentication'

interface SutTypes {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hasherComparerStub: HashComparer
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<Account | null> {
      // return {
      //   id: 'any_id',
      //   name: 'any_name',
      //   email: 'any_email',
      //   password: 'hashed_password'
      // }
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHasherComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async comparer(value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hasherComparerStub = makeHasherComparer()
  const sut = new AuthenticationUseCase(loadAccountByEmailRepositoryStub, hasherComparerStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hasherComparerStub
  }
}

describe('Authentication Use Case', () => {
  describe('LoadAccountByEmailRepository', () => {
    test('deve chamar LoadAccountByEmailRepository com os valores corretos', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      const loadAccountSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      await sut.login('any_email@gmail.com', '123')
      expect(loadAccountSpy).toHaveBeenCalledWith('any_email@gmail.com')
    })

    test('deve lançar uma exception se LoadAccountByEmailRepository throws', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const promise = sut.login('any_email@gmail.com', '123')
      await expect(promise).rejects.toThrow()
    })

    test('deve retornar null se o LoadAccountByEmailRepository não encontrar uma conta', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(null)))
      const account = await sut.login('any_email@gmail.com', '123')
      expect(account).toBeNull()
    })
  })

  describe('HashComparer', () => {
    test('deve chamar HashComparer com os valores corretos', async () => {
      const { sut, hasherComparerStub, loadAccountByEmailRepositoryStub } = makeSut()

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

    test('deve retornar null se o HashComparer falhar', async () => {
      const { sut, hasherComparerStub } = makeSut()
      jest.spyOn(hasherComparerStub, 'comparer').mockReturnValueOnce(new Promise(resolve => resolve(false)))
      const account = await sut.login('any_email', 'any_password')
      expect(account).toBeNull()
    })
  })
})
