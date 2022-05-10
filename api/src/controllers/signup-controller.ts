
import { badRequest, forbidden, serverError, sucess } from '../helpers/http/http'
import {
  AddAccountUseCase,
  HttpRequest,
  HttpResponse,
  Validation,
  Controller
} from '.'
import { EmailInUseError } from '../helpers/erros/email-in-user-error'

export class SignupController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly usecase: AddAccountUseCase
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request.body
      const account = await this.usecase.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      return sucess(account)
    } catch (error) {
      // console.log(error)
      return serverError(error)
    }
  }
}
