import { Validation } from '../../../controllers/import-protocols'
import { EmailValidation } from '../../../validators/email-validation'
import { ValidationComposite } from '../../../validators/validation-composite'
import { ValidationEmailField } from '../../../validators/validation-email-field'
import { ValidationRequiredField } from '../../../validators/validation-required-field'

export const makeCreateAccountValidatorFactory = (): Validation => {
  return new ValidationComposite([
    new ValidationRequiredField('name'),
    new ValidationRequiredField('email'),
    new ValidationRequiredField('password'),
    new ValidationEmailField('email', new EmailValidation())
  ])
}
