import { Validation } from '../../src/controllers/import-protocols'
import { LoginController } from '../../src/controllers/account/login-account-controller'
import { Authentication } from '../../src/domain/usecases/account/authentication'
import { serverError } from '../../src/helpers/http/http'
import { ValidationComposite } from '../../src/validators/validation-composite'
import { ValidationRequiredField } from '../../src/validators/validation-required-field'
import { mockLoginUseCase } from '../data/usecases/mocks/mock-account-usecase'
import { mockAuthenticateAccountRequest } from '../http'

type SutTypes = {
  sut: LoginController
  validationStub: Validation
  loginUseCaseStub: Authentication
}

const mockSut = (): SutTypes => {
  const validationStub = new ValidationComposite([
    new ValidationRequiredField('email')]
  )
  const loginUseCaseStub = mockLoginUseCase()
  const sut = new LoginController(validationStub, loginUseCaseStub)
  return {
    sut,
    loginUseCaseStub,
    validationStub
  }
}

describe('LoginController', () => {
  describe('Validation', () => {
    test('Deve chamar o Validate com os valores correto', async () => {
      const { sut, validationStub } = mockSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      await sut.handle(mockAuthenticateAccountRequest())
      expect(validateSpy).toHaveBeenCalledWith(mockAuthenticateAccountRequest())
    })
  })

  describe('Authentication', () => {
    test('Deve chamar o LoginUseCase com os valores correto', async () => {
      const { sut, loginUseCaseStub } = mockSut()
      const useCaseSpy = jest.spyOn(loginUseCaseStub, 'login')
      await sut.handle(mockAuthenticateAccountRequest())
      expect(useCaseSpy).toHaveBeenCalledWith(
        mockAuthenticateAccountRequest().email,
        mockAuthenticateAccountRequest().password)
    })

    test('Deve lancar uma error se o LoginUseCase throws', async () => {
      const { sut, loginUseCaseStub } = mockSut()
      jest.spyOn(loginUseCaseStub, 'login').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpResponse = await sut.handle(mockAuthenticateAccountRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
