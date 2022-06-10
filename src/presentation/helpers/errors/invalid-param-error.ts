import { AppError } from './app-error'

export class InvalidParamError extends AppError {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
    this.statusCode = 400
  }
}
