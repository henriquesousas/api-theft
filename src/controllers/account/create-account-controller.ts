import { sucess } from '../../helpers/http/http'
import { ErrorFactory } from '../../helpers/erros/factory/error-factory'
import { CreateAccount, HttpResponse, Validation, Controller } from '../import-protocols'

export class CreateAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createAccountUseCase: CreateAccount
  ) { }

  async handle(request: CreateAccountController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const { name, email, password } = request
      const account = await this.createAccountUseCase.create({
        name,
        email,
        password
      })
      return sucess(account)
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}

export namespace CreateAccountController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
