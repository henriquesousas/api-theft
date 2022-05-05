import { badRequest, serverError } from '../../helpers/http/http'
import { HttpRequest } from '../../helpers/http/http-request'
import { HttpResponse } from '../../helpers/http/http-response'
import { Validation } from '../../domain/validators/validation'
import { Controller } from '../controller'

export class SignupController implements Controller {
  constructor (
    private readonly validationComposite: Validation
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse | null> {
    try {
      const error = this.validationComposite.validate(request.body)
      if (error) {
        return badRequest(error)
      }
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
    return null
  }
}
