import { Either, left, right } from '@/presentation/helpers/either'
import { AppError } from '@/presentation/helpers/errors/app-error'
import { EmailValidator } from '../domain/validators/email-validator'
import { Validation } from '../domain/validators/validation'
import { InvalidParamError } from '../presentation/helpers/errors/invalid-param-error'

export class ValidationEmailField implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) { }

  validate(input: any): Either<AppError, null> {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return left(new InvalidParamError(this.fieldName))
    }
    return right(null)
  }
}
