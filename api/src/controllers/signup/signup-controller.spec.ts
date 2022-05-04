import { Validation } from '../../domain/validators/validation'
import { InvalidParamError } from '../../helpers/erros/invalid-param-error'
import { MissingParamError } from '../../helpers/erros/missing-param-error'
import { HttpRequest } from '../../helpers/http/http-request'
import { SignupController } from './signup-controller'

interface SutTypes {
  sut: SignupController
  emailValidationStub: Validation
}

const buildEmailValidatorStub = (): Validation => {
  class EmailValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new EmailValidationStub()
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
  const emailValidationStub = buildEmailValidatorStub()
  const sut = new SignupController(emailValidationStub)
  return {
    sut,
    emailValidationStub
  }
}

describe('SignupController', () => {
  test('deve retornar 400 se name não informado', async () => {
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }
    const { sut } = buildSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.body).toEqual(new MissingParamError('name'))
  })

  test('deve retornar 400 se email não informado', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const { sut } = buildSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.body).toEqual(new MissingParamError('email'))
  })

  test('deve retornar 400 se password não informado', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email'
      }
    }
    const { sut } = buildSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.body).toEqual(new MissingParamError('password'))
  })

  test('deve retornar 400 se email for invalido', async () => {
    const { sut, emailValidationStub } = buildSut()
    jest.spyOn(emailValidationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('email'))
    const httpResponse = await sut.handle(buildFakeRequest())
    expect(httpResponse?.body).toEqual(new InvalidParamError('email'))
  })

  test('deve chamar o EmailValidator com os valores corretos', async () => {
    const { sut, emailValidationStub } = buildSut()
    const emailValidationSpy = jest.spyOn(emailValidationStub, 'validate')
    await sut.handle(buildFakeRequest())
    expect(emailValidationSpy).toHaveBeenCalledWith(buildFakeRequest().body.email)
  })
})
