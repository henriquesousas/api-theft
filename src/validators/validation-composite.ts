import { Validation } from '../domain/validators/validation'

export class ValidationComposite implements Validation {
  constructor(
    private readonly validations: Validation[]
  ) { }

  validate(input: any): void {
    for (const validation of this.validations) {
      validation.validate(input)
    }
  }
}