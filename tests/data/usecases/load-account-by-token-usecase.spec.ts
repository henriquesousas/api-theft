import { LoadAccountByTokenUseCase } from '../../../src/data/usecases/middleware/load-account-by-token-usecase'
import { LoadAccountByToken } from '../../../src/domain/usecases/middleware/load-account-by-token'
import { Decrypter } from '../../../src/data/protocols/cryptography/decrypter'
import { mockLoadAccountByIdRepository } from '../../infra/repository/mocks'
import { LoadAccountByIdRepository } from '../../../src/data/protocols/repository/account/load-account-by-id-repository'

type SutTypes = {
  sut: LoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const mockDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const mockSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const decrypterStub = mockDecrypterStub()
  const sut = new LoadAccountByTokenUseCase(loadAccountByIdRepositoryStub, decrypterStub)
  return {
    sut,
    decrypterStub,
    loadAccountByIdRepositoryStub
  }
}

describe('LoadAccountByTokenUseCase', () => {
  describe('decrypt()', () => {
    test('Deve chamar o Decrypt com o valor correto', async () => {
      const { sut, decrypterStub } = mockSut()
      const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
      await sut.load('access_token', 'admin')
      expect(decryptSpy).toHaveBeenCalledWith('access_token')
    })

    test('Deve throw error se  Decrypt throws', async () => {
      const { sut, decrypterStub } = mockSut()
      jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.load('access_token', 'admin')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Deve chamar o LoadAccountByTokenRepository com os valores correto', async () => {
      const { sut, loadAccountByIdRepositoryStub } = mockSut()
      const loadSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
      await sut.load('access_token', 'admin')
      expect(loadSpy).toHaveBeenCalledWith('any_value')
    })

    test('Deve throw error se  loadById throws', async () => {
      const { sut, loadAccountByIdRepositoryStub } = mockSut()
      jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.load('access_token', 'admin')
      await expect(promise).rejects.toThrow()
    })
  })
})
