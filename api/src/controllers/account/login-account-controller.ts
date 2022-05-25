import { badRequest, serverError, sucess, unauthorized } from '../../helpers/http/http'
import { Validation, HttpRequest, HttpResponse, Controller, Authentication } from '../import-protocols'

export class AuthenticationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly useCase: Authentication
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = request.body
      const error = this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
      }
      const account = await this.useCase.login(email, password)
      if (!account) {
        return unauthorized()
      }
      return sucess(account)
    } catch (error) {
      // console.log(error)
      return serverError(error)
    }
  }
}
