import { MissingParamError } from '../../src/helpers/erros/missing-param-error'
import { ValidationRequiredField } from '../../src/validators/validation-required-field'

describe('ValidationRequiredField', () => {
  test('deve retornar MissingParamError case a validação falhe', () => {
    const httpRequest = {
      email: 'any_email',
      password: 'any_password'
    }
    const sut = new ValidationRequiredField('any_field')
    const httpResponse = sut.validate(httpRequest)
    expect(httpResponse).toEqual(new MissingParamError('any_field'))
  })

  test('deve retornar null case a validação passe', () => {
    const httpRequest = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const sut = new ValidationRequiredField('name')
    const httpResponse = sut.validate(httpRequest)
    expect(httpResponse).toBeFalsy()
  })
})
