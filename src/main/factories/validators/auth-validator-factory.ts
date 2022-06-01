import { Validation } from '../../../controllers/import-protocols'
import { ValidationComposite } from '../../../validators/validation-composite'
import { ValidationRequiredField } from '../../../validators/validation-required-field'

export const makeAuthValidatorFactory = (): Validation => {
  return new ValidationComposite([
    new ValidationRequiredField('email'),
    new ValidationRequiredField('password')
  ])
}
