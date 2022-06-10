export class AppError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.name = 'AppError'
  }
}
