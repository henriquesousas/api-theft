import { Either } from '@/presentation/helpers/either'
import { AppError } from '@/presentation/helpers/errors/app-error'

export interface Validation {
  validate(input: any): Either<AppError, null>
}
