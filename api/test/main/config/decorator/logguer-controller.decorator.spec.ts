import { Controller } from '../../../../src/controllers/controller'
import { HttpRequest, HttpResponse } from '../../../../src/controllers/import-protocols'
import { LogguerRepository } from '../../../../src/data/protocols/repository/logguer-repository'
import { serverError } from '../../../../src/helpers/http/http'
import { LogguerControllerDecorator } from '../../../../src/main/config/decorator/logguer-controller.decorator'

type SutType = {
  sut: LogguerControllerDecorator
  logguerRepositoryStub: LogguerRepository
  controllerStub: Controller
}

const makeFakeRequest = (): HttpRequest => {
  return {
    body: 'any_body'
  }
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle(request: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: 'any_body'
      }
      return await new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeLogguerRepositoryStub = (): LogguerRepository => {
  class LogguerRepositoryStub implements LogguerRepository {
    async log(message: string): Promise<void> {
    }
  }
  return new LogguerRepositoryStub()
}

const makeSut = (): SutType => {
  const controllerStub = makeControllerStub()
  const logguerRepositoryStub = makeLogguerRepositoryStub()
  const sut = new LogguerControllerDecorator(controllerStub, logguerRepositoryStub)
  return {
    sut,
    logguerRepositoryStub,
    controllerStub
  }
}

describe('LoggerController', () => {
  test('deve chamar o Controller com o valor correto', async () => {
    const { sut, controllerStub } = makeSut()
    const controllerSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(controllerSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('deve retornar serverError quando o controller falhar', async () => {
    const { sut, controllerStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(serverError(new Error()))))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('deve chamar o LogguerRepository com o valor correto', async () => {
    const { sut, logguerRepositoryStub, controllerStub } = makeSut()

    const error = new Error()
    error.stack = 'any_error'

    const httpResponse = {
      statusCode: 500,
      body: error
    }

    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise(resolve => resolve(httpResponse)))
    const logguerSpy = jest.spyOn(logguerRepositoryStub, 'log')
    await sut.handle(makeFakeRequest())
    expect(logguerSpy).toHaveBeenCalledWith('any_error')
  })
})
