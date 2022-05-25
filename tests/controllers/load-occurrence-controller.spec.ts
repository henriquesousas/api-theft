import { LoadOccurrenceController } from '../../src/controllers/occurrence/load-occurrence-controller'
import { serverError } from '../../src/helpers/http/http'
import { mockOccurrence } from '../data/models/mock-occurrence'
import { mockLoadOccurrenceByIdUseCase } from '../data/usecases/mocks/mock-occurrence-usecase'

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

  test('Deve retornar uma occorrência quando buscar pelo id', async () => {
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
