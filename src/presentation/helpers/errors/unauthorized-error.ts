export class UnauthorizedError extends Error {
  constructor () {
    super('Sem autorização para este serviço')
    this.name = 'UnauthorizedError'
  }
}
