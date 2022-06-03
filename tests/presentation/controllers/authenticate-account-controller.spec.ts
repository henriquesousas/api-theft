import { AuthController } from '@/presentation/controllers/account/auth-controller'
import { Authentication } from '@/domain/usecases/account/authentication'
import { serverError } from '@/presentation/helpers/http/http'
import { ValidationComposite, ValidationRequiredField } from '@/validators'
import { mockLoginUseCase } from '../../data/usecases/mocks/mock-account-usecase'
import { mockAuthenticateAccountRequest } from '../../http'
import { Validation } from '@/domain/validators'

type SutTypes = {
  sut: AuthController
  validationStub: Validation
  loginUseCaseStub: Authentication
}

const mockSut = (): SutTypes => {
  const validationStub = new ValidationComposite([
    new ValidationRequiredField('email')]
  )
  const loginUseCaseStub = mockLoginUseCase()
  const sut = new AuthController(validationStub, loginUseCaseStub)
  return {
    sut,
    loginUseCaseStub,
    validationStub
  }
}

describe('AuthenticateAccountController', () => {
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
      const useCaseSpy = jest.spyOn(loginUseCaseStub, 'auth')
      await sut.handle(mockAuthenticateAccountRequest())
      expect(useCaseSpy).toHaveBeenCalledWith(
        mockAuthenticateAccountRequest().email,
        mockAuthenticateAccountRequest().password)
    })

    test('Deve lancar uma error se o LoginUseCase throws', async () => {
      const { sut, loginUseCaseStub } = mockSut()
      jest.spyOn(loginUseCaseStub, 'auth').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpResponse = await sut.handle(mockAuthenticateAccountRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
