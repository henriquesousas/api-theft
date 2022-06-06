import { Validation } from '@/domain/validators'
import { ValidationComposite } from '../../../validators/validation-composite'
import { ValidationRequiredField } from '../../../validators/validation-required-field'

export const makeAddOccurrenceValidationFactory = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['userId', 'title', 'description', 'product', 'dateOfOccurrence']) {
    validations.push(new ValidationRequiredField(field))
  }
  return new ValidationComposite(validations)
}
