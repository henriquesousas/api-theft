export class EmailInUseError extends Error {
  constructor () {
    super('Email já cadastrado em nosso sistema.')
    this.name = 'EmailInUseError'
  }
}
