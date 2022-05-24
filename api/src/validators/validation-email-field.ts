import { EmailValidator } from '../domain/validators/email-validator'
import { Validation } from '../domain/validators/validation'
import { InvalidParamError } from '../helpers/erros/invalid-param-error'

export class ValidationEmailField implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): void {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      throw new InvalidParamError(this.fieldName)
    }
  }
}
