import { MissingParamError } from '../../src/helpers/erros/missing-param-error'
import { ValidationComposite } from '../../src/validators/validation-composite'
import { ValidationRequiredField } from '../../src/validators/validation-required-field'

describe('CompositeValidation', () => {
  test('Deve retornar null se passar em todos os validators', () => {
    const validators = [new ValidationRequiredField('any_field')]
    const sut = new ValidationComposite(validators)
    jest.spyOn(sut, 'validate').mockReturnValueOnce(null)
    const error = sut.validate('any_value')
    expect(error).toBeNull()
  })

  test('Deve retornar um error caso falhe em algum validator', () => {
    const httpRequest = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const validators = [
      new ValidationRequiredField('email'),
      new ValidationRequiredField('password')
    ]
    const sut = new ValidationComposite(validators)

    jest.spyOn(sut, 'validate').mockReturnValueOnce(new MissingParamError('name'))

    const error = sut.validate(httpRequest)
    expect(error).toEqual(new MissingParamError('name'))
  })
})
