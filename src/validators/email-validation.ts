import { EmailValidator } from '../domain/validators/email-validator'
import validator from 'validator'

export class EmailValidation implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
