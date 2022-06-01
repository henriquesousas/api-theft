import { Validation } from '@/domain/validators'
import { Authentication } from '@/domain/usecases/account'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ErrorFactory } from '@/presentation/helpers/errors'
import { sucess } from '@/presentation/helpers/http/http'

export class AuthenticateController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly useCase: Authentication
  ) { }

  async handle(request: AuthenticateController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const { email, password } = request
      const account = await this.useCase.auth(email, password)
      return sucess(account)
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}

export namespace AuthenticateController {
  export type Request = {
    email: string
    password: string
  }
}
