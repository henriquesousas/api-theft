import { Authentication } from '../../domain/usecases/authentication'
import { Validation } from '../../domain/validators/validation'
import { badRequest, serverError, sucess, unauthorized } from '../../helpers/http/http'
import { HttpRequest } from '../../helpers/http/http-request'
import { HttpResponse } from '../../helpers/http/http-response'
import { Controller } from '../controller'

export class AuthenticationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loginUseCase: Authentication
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
        return unauthorized()
      }
      return sucess(account)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
