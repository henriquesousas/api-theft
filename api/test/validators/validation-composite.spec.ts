import { Validation } from '../../src/controllers/import-protocols'
import { MissingParamError } from '../../src/helpers/erros/missing-param-error'
import { ValidationComposite } from '../../src/validators/validation-composite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

describe('CompositeValidation', () => {
  test('Deve retornar null se nenhum validator falhar', () => {
    const validationStub = makeValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeNull()
  })

  test('Deve retornar MissingParamError se alguma validator falhar', () => {
    const validationStub = makeValidationStub()
    const sut = new ValidationComposite([validationStub])
    jest.spyOn(sut, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
