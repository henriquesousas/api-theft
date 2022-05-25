import { ErrorFactory } from '../../helpers/erros/factory/error-factory'
import { sucess } from '../../helpers/http/http'
import { Validation, HttpRequest, HttpResponse, Controller, Authentication } from '../import-protocols'

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loginUseCase: Authentication
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(request.body)
      const { email, password } = request.body
      const account = await this.loginUseCase.login(email, password)
      return sucess(account)
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}
