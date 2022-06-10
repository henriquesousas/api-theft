import { AppError } from './app-error'

export class EmailInUseError extends AppError {
  constructor () {
    super('Email já cadastrado em nosso sistema.')
    this.name = 'EmailInUseError'
    this.statusCode = 403
  }
}
