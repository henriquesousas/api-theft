import { LoadOccurrenceController } from '@/presentation/controllers/occurrences/load-occurrence-controller'
import { serverError } from '@/presentation/helpers/http/http'
import { mockLoadOccurrenceByIdUseCase } from '../data/usecases/mocks/mock-occurrence-usecase'
import { mockOccurrence } from '../data/models/mock-occurrence'

describe('LoadOccurrenceController', () => {
  test('Deve chamar o LoadOccurrenceById com o valor correto', async () => {
    const loadOccurrenceByIdUseCaseStub = mockLoadOccurrenceByIdUseCase()
    const sut = new LoadOccurrenceController(loadOccurrenceByIdUseCaseStub)
    const loadSpy = jest.spyOn(loadOccurrenceByIdUseCaseStub, 'loadById')
    await sut.handle({
      params: {
        occurrenceId: 'any_id'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Deve retornar uma occorrĂȘncia quando buscar pelo id', async () => {
    const loadOccurrenceByIdUseCaseStub = mockLoadOccurrenceByIdUseCase()
    const sut = new LoadOccurrenceController(loadOccurrenceByIdUseCaseStub)
    jest.spyOn(loadOccurrenceByIdUseCaseStub, 'loadById')
    const httpResponse = await sut.handle({
      params: {
        occurrenceId: 'any_id'
      }
    })
    expect(httpResponse.body.id).toEqual(mockOccurrence().id)
  })

  test('Deve retornar um error se LoadOccurrenceById throws', async () => {
    const loadOccurrenceByIdUseCaseStub = mockLoadOccurrenceByIdUseCase()
    const sut = new LoadOccurrenceController(loadOccurrenceByIdUseCaseStub)
    jest.spyOn(loadOccurrenceByIdUseCaseStub, 'loadById').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle({
      params: {
        occurrenceId: 'any_id'
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
