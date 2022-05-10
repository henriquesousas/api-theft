import { LoginUseCase } from '../domain/usecases/login-usecase'
import { Validation } from '../domain/validators/validation'
import { badRequest, serverError, sucess } from '../helpers/http/http'
import { HttpRequest } from '../helpers/http/http-request'
import { HttpResponse } from '../helpers/http/http-response'
import { Controller } from './controller'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loginUseCase: LoginUseCase
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = request.body
      const error = this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
      }
      const account = await this.loginUseCase.login(email, password)
      if (!account) {
        return badRequest(new Error())
      }
      return sucess(account)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
