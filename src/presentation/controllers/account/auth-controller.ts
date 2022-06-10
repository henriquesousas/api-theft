import { Validation } from '@/domain/validators'
import { Authentication } from '@/domain/usecases/account'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { error, serverError, success } from '@/presentation/helpers/http/http'

export namespace AuthController {
  export type Request = {
    email: string
    password: string
  }
}
export class AuthController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly usecase: Authentication
  ) { }

  async handle(request: AuthController.Request): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(request)
      if (validationResult.isLeft()) {
        return error(validationResult.value)
      }
      const accountOrError = await this.usecase.auth({
        email: request.email,
        password: request.password
      })
      if (accountOrError.isLeft()) {
        return error(accountOrError.value)
      }
      return success(accountOrError.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
