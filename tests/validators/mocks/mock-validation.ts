import { Validation } from '@/domain/validators'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): void {

    }
  }
  return new ValidationStub()
}
