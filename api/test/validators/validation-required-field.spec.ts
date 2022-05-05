import { MissingParamError } from '../../src/helpers/erros/missing-param-error'
import { ValidationRequiredField } from '../../src/validators/validation-required-field'

describe('RequiredFieldValidation', () => {
  test('deve retornar MissingParamError se name não informado', async () => {
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }
    const sut = new ValidationRequiredField('name')
    const httpResponse = await sut.validate(httpRequest)
    expect(httpResponse).toEqual(new MissingParamError('name'))
  })

  test('deve retornar MissingParamError se email não informado', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const sut = new ValidationRequiredField('email')
    const httpResponse = await sut.validate(httpRequest)
    expect(httpResponse).toEqual(new MissingParamError('email'))
  })

  test('deve retornar MissingParamError se password não informado', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email'
      }
    }
    const sut = new ValidationRequiredField('password')
    const httpResponse = await sut.validate(httpRequest)
    expect(httpResponse).toEqual(new MissingParamError('password'))
  })

  test('deve chamar RequiredFieldValidation com os valores corretos', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }
    const sut = new ValidationRequiredField('any_field')
    const validatorSpy = jest.spyOn(sut, 'validate')
    await sut.validate(httpRequest)
    expect(validatorSpy).toHaveBeenCalledWith(httpRequest)
  })
})
