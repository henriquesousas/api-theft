export class EmailInUseError extends Error {
  constructor () {
    super('Email já esta sendo utilizado')
    this.name = 'EmailInUseError'
  }
}
