export class UnauthorizedError extends Error {
  constructor () {
    super('Acesso negado')
    this.name = 'UnauthorizedError'
  }
}
