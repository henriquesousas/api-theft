import { Validation } from '../../../src/controllers/import-protocols'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): void {

    }
  }
  return new ValidationStub()
}
