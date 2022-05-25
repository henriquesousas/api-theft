import { ValidationComposite } from '../../src/validators/validation-composite'
import { Validation } from '../../src/domain/validators/validation'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): void {
    }
  }
  return new ValidationStub()
}

describe('ValidationComposite', () => {
  test('Deve retornar nenhum error se validar com sucesso', () => {
    const validationStub = makeValidationStub()
    const sut = new ValidationComposite([validationStub])
    const resolve = sut.validate({ field: 'any_field' })
    expect(resolve).toBeUndefined()
  })
})
