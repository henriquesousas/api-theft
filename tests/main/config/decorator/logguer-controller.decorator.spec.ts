import { Controller } from '../../../presentation/protocols/controller'
import { LogguerRepository } from '../../../../src/data/protocols/repository/logguer/logguer-repository'
import { serverError } from '../../../../src/presentation/helpers/http/http'
import { LogguerControllerDecorator } from '../../../../src/main/config/decorator/logguer-controller.decorator'
import { mockLogguerRepository } from '../../../infra/repository/mocks'
import { mockBaseController } from '../../../controllers/mocks/mock-controller'
import { mockCreateAccountRequest } from '../../../http'

type SutType = {
  sut: LogguerControllerDecorator
  logguerRepositoryStub: LogguerRepository
  controllerStub: Controller
}

const mockSut = (): SutType => {
  const controllerStub = mockBaseController()
  const logguerRepositoryStub = mockLogguerRepository()
  const sut = new LogguerControllerDecorator(controllerStub, logguerRepositoryStub)
  return {
    sut,
    logguerRepositoryStub,
    controllerStub
  }
}

describe('LogguerController', () => {
  test('Deve chamar o LogguerController com o valor correto', async () => {
    const { sut, controllerStub } = mockSut()
    const controllerSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(mockCreateAccountRequest())
    expect(controllerSpy).toHaveBeenCalledWith(mockCreateAccountRequest())
  })

  test('Deve retornar serverError quando o controller falhar', async () => {
    const { sut, controllerStub } = mockSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(serverError(new Error()))))
    const httpResponse = await sut.handle(mockCreateAccountRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Deve chamar o LogguerRepository com o valor correto', async () => {
    const { sut, logguerRepositoryStub, controllerStub } = mockSut()

    const error = new Error()
    error.stack = 'any_error'

    const httpResponse = {
      statusCode: 500,
      body: error
    }

    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise(resolve => resolve(httpResponse)))
    const logguerSpy = jest.spyOn(logguerRepositoryStub, 'log')
    await sut.handle(mockCreateAccountRequest())
    expect(logguerSpy).toHaveBeenCalledWith('any_error')
  })
})
