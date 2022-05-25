
import { sucess } from '../../helpers/http/http'
import { CreateAccount, HttpRequest, HttpResponse, Validation, Controller } from '../import-protocols'
import { ErrorFactory } from '../../helpers/erros/factory/error-factory'

export class CreateAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccountUseCase: CreateAccount
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(request.body)
      const { name, email, password } = request.body
      const account = await this.addAccountUseCase.create({
        name,
        email,
        password
      })
      return sucess(account)
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}
