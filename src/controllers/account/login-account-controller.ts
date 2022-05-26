import { ErrorFactory } from '../../helpers/erros/factory/error-factory'
import { sucess } from '../../helpers/http/http'
import { Validation, HttpResponse, Authentication, Controller } from '../import-protocols'

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loginUseCase: Authentication
  ) { }

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const { email, password } = request
      const account = await this.loginUseCase.login(email, password)
      return sucess(account)
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
