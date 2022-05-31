import { sucess } from '../../helpers/http/http'
import { ErrorFactory } from '../../helpers/errors/error-factory'
import { AddAccount, HttpResponse, Validation, Controller } from '../../../controllers/import-protocols'

export class AddAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createAccountUseCase: AddAccount
  ) { }

  async handle(request: AddAccountController.Request): Promise<HttpResponse> {
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

export namespace AddAccountController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
