import { AppError } from './app-error'

export class MissingParamError extends AppError {
  constructor (paramName: string) {
    super(`${paramName} is required`)
    this.name = 'MissingParamError'
    this.statusCode = 400
  }
}
