import { AppError } from './app-error'

export class UnauthorizedError extends AppError {
  constructor() {
    super('Acesso negado')
    this.name = 'UnauthorizedError'
    this.statusCode = 401
  }
}
