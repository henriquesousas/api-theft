import { Validation } from '../../../src/controllers/import-protocols'
import { LoginController } from '../../../src/controllers/account/login-account-controller'
import { Authentication } from '../../../src/domain/usecases/account/authentication'
import { serverError } from '../../../src/helpers/http/http'
import { ValidationComposite } from '../../../src/validators/validation-composite'
import { ValidationRequiredField } from '../../../src/validators/validation-required-field'
import { mockAuthenticateUseCase } from '../../data/usecases/mocks'
import { mockAccountRequestWithoutName } from '../../http/mock-account-request'

type SutTypes = {
  sut: LoginController
  validationStub: Validation
  loginUseCaseStub: Authentication
}

const mockSut = (): SutTypes => {
  const validationStub = new ValidationComposite([
    new ValidationRequiredField('email')]
  )
  const loginUseCaseStub = mockAuthenticateUseCase()
  const sut = new LoginController(validationStub, loginUseCaseStub)
  return {
    sut,
    loginUseCaseStub,
    validationStub
  }
}

describe('AuthenticationController', () => {
  test('deve chamar o Validate com os valores correto', async () => {
    const { sut, validationStub } = mockSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockAccountRequestWithoutName())
    expect(validateSpy).toHaveBeenCalledWith(mockAccountRequestWithoutName().body)
  })

  test('deve chamar o AuthenticateUseCase com os valores correto', async () => {
    const { sut, loginUseCaseStub } = mockSut()
    const useCaseSpy = jest.spyOn(loginUseCaseStub, 'login')
    await sut.handle(mockAccountRequestWithoutName())
    expect(useCaseSpy).toHaveBeenCalledWith(
      mockAccountRequestWithoutName().body.email,
      mockAccountRequestWithoutName().body.password)
  })

  test('deve lancar uma error se o AuthenticateUseCase throws', async () => {
    const { sut, loginUseCaseStub } = mockSut()
    jest.spyOn(loginUseCaseStub, 'login').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockAccountRequestWithoutName())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
