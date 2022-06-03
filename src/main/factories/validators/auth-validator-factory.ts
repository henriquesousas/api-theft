import { Validation } from '@/domain/validators'
import { ValidationComposite } from '../../../validators/validation-composite'
import { ValidationRequiredField } from '../../../validators/validation-required-field'

export const makeAuthValidatorFactory = (): Validation => {
  return new ValidationComposite([
    new ValidationRequiredField('email'),
    new ValidationRequiredField('password')
  ])
}
