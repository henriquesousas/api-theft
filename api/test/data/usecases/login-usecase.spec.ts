import { LoadAccountByEmailRepository } from '../../../src/data/protocols/repository/load-account-by-email-repository'
import { LoginUseCaseImpl } from '../../../src/data/usecases/login-usecase-impl'
import { Account } from '../../../src/domain/models/account'
import { LoginUseCase } from '../../../src/domain/usecases/login-usecase'

interface SutTypes {
  sut: LoginUseCase
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<Account | null> {
      return {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new LoginUseCaseImpl(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('LoginUseCase', () => {
  test('deve chamar LoadAccountByEmailRepository com os valores corretos', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loginRepoSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.login('any_email@gmail.com', '123')
    expect(loginRepoSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })

  test('deve lançar uma exception LoadAccountByEmailRepository', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loginRepoSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.login('any_email@gmail.com', '123')
    expect(loginRepoSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })

  test('deve retornar null se o LoadAccountByEmailRepository não encontrar uma conta', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.login('any_email@gmail.com', '123')
    expect(account).toBeNull()
  })
})
