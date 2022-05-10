import { Validation } from '../../../../controllers'
import { EmailValidation } from '../../../../validators/email-validation'
import { ValidationComposite } from '../../../../validators/validation-composite'
import { ValidationEmailField } from '../../../../validators/validation-email-field'
import { ValidationRequiredField } from '../../../../validators/validation-required-field'

export const makeSignupValidatorFactory = (): Validation => {
  return new ValidationComposite([
    new ValidationRequiredField('name'),
    new ValidationRequiredField('email'),
    new ValidationRequiredField('password'),
    new ValidationEmailField('email', new EmailValidation())
  ])
}
