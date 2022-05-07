import { MissingParamError } from '../helpers/erros/missing-param-error'
import { Validation } from '../domain/validators/validation'

export class ValidationRequiredField implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error | null {
    const field = input[this.fieldName]
    if (!field) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
