import { Validation } from '../../src/domain/validators/validation'
import { HttpRequest } from '../../src/helpers/http/http-request'
import { SignupController } from '../../src/controllers/signup/signup-controller'
import { ValidationRequiredField } from '../../src/validators/validation-required-field'
import { ValidationComposite } from '../../src/validators/validation-composite'
import { ServerError } from '../../src/helpers/erros/server-error'
import { serverError } from '../../src/helpers/http/http'

interface SutTypes {
  sut: SignupController
  compositeValidationStub: Validation
}

const buildCompositeValidationStub = (): Validation => {
  const validators = [new ValidationRequiredField('name')]
  return new ValidationComposite(validators)
}

const buildFakeRequest = (): HttpRequest => {
  const httpRequest = {
    body: {
      name: 'any_nam',
      email: 'any_email',
      password: 'any_password'
    }
  }
  return httpRequest
}

const buildSut = (): SutTypes => {
  const compositeValidationStub = buildCompositeValidationStub()
  const sut = new SignupController(compositeValidationStub)
  return {
    sut,
    compositeValidationStub
  }
}

describe('SignupController', () => {
  test('deve chamar o CompositeValidation com o valores corretos', async () => {
    const { sut, compositeValidationStub } = buildSut()
    const validateSpy = jest.spyOn(compositeValidationStub, 'validate')
    await sut.handle(buildFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(buildFakeRequest().body)
  })

  test('deve retornar null se o CompositeValidation passar', async () => {
    const { sut, compositeValidationStub } = buildSut()
    const validateSpy = jest.spyOn(compositeValidationStub, 'validate')
    await sut.handle(buildFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(buildFakeRequest().body)
  })

  test('deve retornar serverError (exceção) se o validation throws', async () => {
    const { sut, compositeValidationStub } = buildSut()
    jest.spyOn(compositeValidationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(buildFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
