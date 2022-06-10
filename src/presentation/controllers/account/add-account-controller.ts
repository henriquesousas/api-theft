import { error, serverError, success } from '@/presentation/helpers/http/http'
import { AddAccount } from '@/domain/usecases/account'
import { Validation } from '@/domain/validators'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { AddAccountResponse } from '@/data/usecases/account/add/add-account-response'

export namespace AddAccountController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}

export class AddAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly useCase: AddAccount
  ) {
  }

  async handle(request: AddAccountController.Request): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(request)
      if (validationResult.isLeft()) {
        return error(validationResult.value)
      }
      const { name, email, password } = request
      const addAccountOrError: AddAccountResponse = await this.useCase.create({
        name,
        email,
        password
      })
      if (addAccountOrError.isLeft()) {
        return error(addAccountOrError.value)
      }
      return success(addAccountOrError.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
