import { ErrorFactory } from '../../helpers/errors/error-factory'
import { sucess } from '../../helpers/http/http'
import { Validation, HttpResponse, Authentication, Controller } from '../../../controllers/import-protocols'

export class AuthenticateController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loginUseCase: Authentication
  ) { }

  async handle(request: AuthenticateController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const { email, password } = request
      const account = await this.loginUseCase.auth(email, password)
      return sucess(account)
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}

export namespace AuthenticateController {
  export type Request = {
    email: string
    password: string
  }
}
