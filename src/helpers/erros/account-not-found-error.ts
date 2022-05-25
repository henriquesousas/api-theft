export class AccountNotFoundError extends Error {
  constructor () {
    super('Conta de usuário não encontrada')
    this.name = 'AccountNotFoundError'
  }
}
