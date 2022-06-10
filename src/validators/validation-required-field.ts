import { MissingParamError } from '../presentation/helpers/errors/missing-param-error'
import { Validation } from '../domain/validators/validation'
import { Either, left, right } from '@/presentation/helpers/either'
import { AppError } from '@/presentation/helpers/errors/app-error'

export class ValidationRequiredField implements Validation {
  constructor(private readonly fieldName: string) { }
  validate(input: any): Either<AppError, null> {
    const field = input[this.fieldName]
    if (!field) {
      return left(new MissingParamError(this.fieldName))
    }
    return right(null)
  }
}
