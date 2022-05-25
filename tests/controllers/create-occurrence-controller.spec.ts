import { Validation } from '../../src/controllers/import-protocols'
import { CreateOccurrenceController } from '../../src/controllers/occurrence/create-occurrence-controller'
import { CreateOccurrence } from '../../src/domain/usecases/occurrence/create-occurrence'
import { serverError } from '../../src/helpers/http/http'
import { mockCreateOccurrence } from '../data/usecases/mocks/mock-occurrence-usecase'
import { mockAddOccurrenceRequest } from '../http/mock-occurrence-request'
import { mockValidation } from '../validators/mocks'

type SutTypes = {
  sut: CreateOccurrenceController
  addOccurrenceUseCaseStub: CreateOccurrence
  validationStub: Validation
}

const mockSut = (): SutTypes => {
  const addOccurrenceUseCaseStub = mockCreateOccurrence()
  const validationStub = mockValidation()
  const sut = new CreateOccurrenceController(addOccurrenceUseCaseStub, validationStub)
  return {
    sut,
    addOccurrenceUseCaseStub,
    validationStub
  }
}

describe('OccurrenceController', () => {
  describe('AddOccurrenceUsecase', () => {
    test('deve chamar AddOccurrenceUsecase com os valores corretos', async () => {
      const { sut, addOccurrenceUseCaseStub } = mockSut()
      const addSpy = jest.spyOn(addOccurrenceUseCaseStub, 'add')
      const mockOccurrenceRequest = mockAddOccurrenceRequest()
      await sut.handle(mockOccurrenceRequest)
      expect(addSpy).toHaveBeenCalledWith(mockOccurrenceRequest.body)
    })

    test('deve retornar 200 se AddOccurrenceUsecase cadastrar a conta com sucesso', async () => {
      const { sut } = mockSut()
      const httpResponse = await sut.handle(mockAddOccurrenceRequest())
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.statusCode).toEqual(200)
    })

    test('deve lançar uma exception se o AddOccurrenceUsecase throws', async () => {
      const { sut, addOccurrenceUseCaseStub } = mockSut()
      jest.spyOn(addOccurrenceUseCaseStub, 'add').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpResponse = await sut.handle(mockAddOccurrenceRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })

  describe('Validation', () => {
    test('deve chamar o validation com os valores correto', async () => {
      const { sut, validationStub } = mockSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const mockOccurrenceRequest = mockAddOccurrenceRequest()
      await sut.handle(mockOccurrenceRequest)
      expect(validateSpy).toHaveBeenCalledWith(mockOccurrenceRequest.body)
    })

    // TODO: Refactor
    test('deve retornar badRequest 400 se algum validator falhar', async () => {
      // const { sut, validationStub } = mockSut()
      // jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any_error'))
      // const mockOccurrenceRequest = mockAddOccurrenceRequest()
      // const httpResponse = await sut.handle(mockOccurrenceRequest)
      // expect(httpResponse).toEqual(badRequest(new Error('any_error')))
    })
  })
})
