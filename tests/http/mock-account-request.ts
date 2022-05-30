import { CreateAccountController } from '../controllers/account/create-account-controller'
import { LoginController } from '../controllers/account/login-account-controller'

export const mockCreateAccountRequest = (): CreateAccountController.Request => {
  const request = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
  return request
}

export const mockAuthenticateAccountRequest = (): LoginController.Request => {
  return {
    email: 'any_name',
    password: 'any_name'
  }
}
