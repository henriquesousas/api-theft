import { MissingParamError } from '../helpers/erros/missing-param-error'
import { Validation } from '../domain/validators/validation'

export class ValidationRequiredField implements Validation {
  constructor(private readonly fieldName: string) { }

  validate(input: any): void {
    const field = input[this.fieldName]
    if (!field) {
      throw new MissingParamError(this.fieldName)
    }
  }
}
