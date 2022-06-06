import { Validation } from '@/domain/validators'
import {
  EmailValidation,
  ValidationComposite,
  ValidationRequiredField,
  ValidationEmailField
} from '@/validators'

export const makeCreateAccountValidatorFactory = (): Validation => {
  return new ValidationComposite([
    new ValidationRequiredField('name'),
    new ValidationRequiredField('email'),
    new ValidationRequiredField('password'),
    new ValidationEmailField('email', new EmailValidation())
  ])
}
