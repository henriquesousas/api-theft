import { Account } from "../../../src/domain/models/account"

export const mockAccountModel = (): Account => {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  }
}