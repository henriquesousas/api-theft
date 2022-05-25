import { MissingParamError } from '../../src/helpers/erros/missing-param-error'
import { ValidationRequiredField } from '../../src/validators/validation-required-field'

describe('ValidationRequiredField', () => {
  // Refactor
  test('Deve throws MissingParamError se o validator falhar', () => {
    const httpRequest = {
      email: 'any_email',
      password: 'any_password'
    }
    const sut = new ValidationRequiredField('any_field')
    try {
      sut.validate(httpRequest)
      expect(true).toEqual(false)
    } catch (error) {
      expect(error).toBeInstanceOf(MissingParamError)
    }
  })

  test('Não deve throws se o validator não falhar', () => {
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
