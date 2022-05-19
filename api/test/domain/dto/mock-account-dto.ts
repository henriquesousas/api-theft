import { AccountDto } from '../../../src/domain/dto/account-dto'

export const mockAccountDto = (): AccountDto => {
  return {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
}
