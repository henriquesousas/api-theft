import { LoadAccountByIdRepository } from '../protocols/repository/account/load-account-by-id-repository'
import { AddOccurrenceRepositoy } from '../protocols/repository/ocurrence/add-occurrence-repository'
import { AddOccurrenceUsecase } from '@/data/usecases/occurrence/add-ocurrence-usecase'
import { mockOccurrenceDto } from '../../domain/dto/mock-occurrence-dto'
import { mockLoadAccountByIdRepository } from '../../infra/repository/mocks'
import { mockAddOccurrenceRepository } from '../../infra/repository/mocks/mock-add-occurrence-repository'

type SutTypes = {
  sut: AddOccurrenceUsecase
  addOccurrenceRepositoyStub: AddOccurrenceRepositoy
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const mockSut = (): SutTypes => {
  const addOccurrenceRepositoyStub = mockAddOccurrenceRepository()
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const sut = new AddOccurrenceUsecase(addOccurrenceRepositoyStub, loadAccountByIdRepositoryStub)
  return {
    sut,
    addOccurrenceRepositoyStub,
    loadAccountByIdRepositoryStub
  }
}

describe('CreateOccurrenceUsecase', () => {
  describe('AddOccurrenceRepositoy', () => {
    test('Deve chamar AddOccurrenceRepositoy com os valores corretos', async () => {
      const { sut, addOccurrenceRepositoyStub } = mockSut()
      const addSpy = jest.spyOn(addOccurrenceRepositoyStub, 'add')
      const dto = mockOccurrenceDto()
      await sut.add(dto)
      expect(addSpy).toHaveBeenCalledWith(dto)
    })

    test('Deve lançar uma exception se o AddOccurrenceRepositoy throws', async () => {
      const { sut, addOccurrenceRepositoyStub } = mockSut()
      jest.spyOn(addOccurrenceRepositoyStub, 'add').mockImplementationOnce(async () => await Promise.reject(new Error()))
      const promise = sut.add(mockOccurrenceDto())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('LoadAccountByIdRepository', () => {
    test('deve chamar LoadAccountByIdRepository (add) com o id correto', async () => {
      const { sut, loadAccountByIdRepositoryStub } = mockSut()
      const loadSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
      const dto = mockOccurrenceDto()
      await sut.add(dto)
      expect(loadSpy).toHaveBeenCalledWith(dto.userId)
    })

    test('deve lançar exceção UnauthorizedError se LoadAccountByIdRepository (loadById) não encontrar uma conta', async () => {
      const { sut, loadAccountByIdRepositoryStub } = mockSut()
      const dto = mockOccurrenceDto()
      jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
      const promise = sut.add(dto)
      await expect(promise).rejects.toThrow()
    })
  })
})
