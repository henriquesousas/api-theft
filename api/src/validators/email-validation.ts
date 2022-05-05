import { Validation } from '../domain/validators/validation'
import { InvalidParamError } from '../helpers/erros/invalid-param-error'
import validator from 'validator'

export class EmailValidation implements Validation {
  validate (input: any): Error | null {
    const isValid = validator.isEmail(input.email)
    if (!isValid) {
      return new InvalidParamError('email')
    }
    return null
  }
}
