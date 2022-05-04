import { MissingParamError } from '../../helpers/erros/missing-param-error'
import { badRequest } from '../../helpers/http/http'
import { HttpRequest } from '../../helpers/http/http-request'
import { HttpResponse } from '../../helpers/http/http-response'
import { Validation } from '../../domain/validators/validation'
import { Controller } from '../controller'
import { InvalidParamError } from '../../helpers/erros/invalid-param-error'

export class SignupController implements Controller {
  constructor (
    private readonly validation: Validation
  ) { }

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

    const error = this.validation.validate(email)
    if (error) {
      return badRequest(error)
    }

    return null
  }
}
