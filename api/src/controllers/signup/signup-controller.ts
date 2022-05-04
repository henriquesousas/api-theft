import { MissingParamError } from '../../helpers/erros/missing-param-error'
import { badRequest } from '../../helpers/http/http'
import { HttpRequest } from '../../helpers/http/http-request'
import { HttpResponse } from '../../helpers/http/http-response'
import { Controller } from '../controller'

export class SignupController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse | null> {
    const { name, email, password } = request.body
    if (!name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!password) {
      return badRequest(new MissingParamError('password'))
    }
    return null
  }
}
