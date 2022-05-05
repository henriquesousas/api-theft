import { MissingParamError } from '../helpers/erros/missing-param-error'
import { Validation } from '../domain/validators/validation'

export class ValidationRequiredField implements Validation {
  constructor (
    private readonly paramField: string
  ) {}

  validate (input: any): Error | null {
    const field = input[this.paramField]
    if (!field) {
      return new MissingParamError(this.paramField)
    }
    return null
  }
}
