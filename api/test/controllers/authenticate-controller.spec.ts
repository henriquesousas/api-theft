import { HttpRequest, Validation } from '../../src/controllers/import-protocols'
import { AuthenticationController } from '../../src/controllers/account/authentication-controller'
import { Account } from '../../src/domain/models/account'
import { Authentication } from '../../src/domain/usecases/authentication'
import { serverError } from '../../src/helpers/http/http'
import { ValidationComposite } from '../../src/validators/validation-composite'
import { ValidationRequiredField } from '../../src/validators/validation-required-field'

interface SutTypes {
  sut: AuthenticationController
  validationStub: Validation
  loginUseCaseStub: Authentication
}

const makefakeRequest = (): HttpRequest => {
  return {
    body: {
      email: 'any_email',
      password: 'any_password'
    }
  }
}

const makeLoginUseCase = (): Authentication => {
  class LoginUseCaseStub implements Authentication {
    async login (email: string, password: string): Promise<Account | null> {
      return await new Promise(resolve => resolve(null))
    }
  }
  const loginUseCaseStub = new LoginUseCaseStub()
  return loginUseCaseStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationComposite([
    new ValidationRequiredField('email')]
  )
  const loginUseCaseStub = makeLoginUseCase()
  const sut = new AuthenticationController(validationStub, loginUseCaseStub)
  return {
    sut,
    loginUseCaseStub,
    validationStub
  }
}

describe('AuthenticationController', () => {
  test('deve chamar o Validate com os valores correto', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makefakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makefakeRequest().body)
  })

  test('deve chamar o LoginUseCase com os valores correto', async () => {
    const { sut, loginUseCaseStub } = makeSut()
    const useCaseSpy = jest.spyOn(loginUseCaseStub, 'login')
    await sut.handle(makefakeRequest())
    expect(useCaseSpy).toHaveBeenCalledWith(
      makefakeRequest().body.email,
      makefakeRequest().body.password)
  })

  test('deve lancar um exception se o LoginUseCase throws', async () => {
    const { sut, loginUseCaseStub } = makeSut()
    jest.spyOn(loginUseCaseStub, 'login').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makefakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
