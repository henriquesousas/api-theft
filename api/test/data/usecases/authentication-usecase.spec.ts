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
    async loadByEmail (email: string): Promise<Account | null> {
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

const makeHasherComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async comparer (value: string, hash: string): Promise<boolean> {
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

describe('AuthenticationUseCase', () => {
  test('deve chamar LoadAccountByEmailRepository com os valores corretos', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadAccountSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.login('any_email@gmail.com', '123')
    expect(loadAccountSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })

  test('deve chamar HashComparer com os valores corretos', async () => {
    const { sut, hasherComparerStub } = makeSut()
    const hashComparerSpy = jest.spyOn(hasherComparerStub, 'comparer')
    await sut.login('any_email', 'any_password')
    expect(hashComparerSpy).toHaveBeenCalledWith('hashed_password', 'any_password')
  })

  test('deve lançar uma exception LoadAccountByEmailRepository', async () => {
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
