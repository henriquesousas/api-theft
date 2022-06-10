import { Either, right } from '@/presentation/helpers/either'
import { AppError } from '@/presentation/helpers/errors/app-error'
import { Validation } from '../domain/validators/validation'

export class ValidationComposite implements Validation {
  constructor(
    private readonly validations: Validation[]
  ) { }

  validate(input: any): Either<AppError, null> {
    for (const validation of this.validations) {
      const validationResult = validation.validate(input)
      if (validationResult.isLeft()) {
        return validationResult
      }
    }
    return right(null)
  }
}
