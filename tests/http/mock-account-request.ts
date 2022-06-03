import { AuthenticateController } from '../presentation/controllers/account/auth-controller'
import { AddAccountController } from '../presentation/controllers/account/add-account-controller'

export const mockCreateAccountRequest = (): AddAccountController.Request => {
  const request = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
  return request
}

export const mockAuthenticateAccountRequest = (): AuthenticateController.Request => {
  return {
    email: 'any_name',
    password: 'any_name'
  }
}
