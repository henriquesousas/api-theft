import { AddOccurrenceUsecase } from '../../../src/data/usecases/occurrence/add-ocurrence-usecase'
import { mockOccurrenceDto } from '../../domain/dto/mock-occurrence-dto'
import { mockAddOccurrenceRepository } from '../../infra/repository/mocks/mock-add-occurrence-repository'

describe('AddOccurrenceUseCase', () => {
  describe('AddOccurrenceRepositoy', () => {
    test('deve chamar AddOccurrenceRepositoy com os valores corretos', async () => {
      const addOccurrenceRepositoyStub = mockAddOccurrenceRepository()
      const sut = new AddOccurrenceUsecase(addOccurrenceRepositoyStub)
      const addSpy = jest.spyOn(addOccurrenceRepositoyStub, 'add')
      const dto = mockOccurrenceDto()
      await sut.add(dto)
      expect(addSpy).toHaveBeenCalledWith(dto)
    })

    test('deve lançar uma exception se o AddOccurrenceRepositoy throws', async () => {
      const addOccurrenceRepositoyStub = mockAddOccurrenceRepository()
      const sut = new AddOccurrenceUsecase(addOccurrenceRepositoyStub)
      jest.spyOn(addOccurrenceRepositoyStub, 'add').mockImplementationOnce(async () => await Promise.reject(new Error()))
      const promise = sut.add(mockOccurrenceDto())
      await expect(promise).rejects.toThrow()
    })
  })
})
