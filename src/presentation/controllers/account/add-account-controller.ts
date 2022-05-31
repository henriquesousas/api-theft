import { AddAccount } from '@/domain/usecases/account'
import { Validation } from '@/domain/validators'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { sucess } from '@/presentation/helpers/http/http'
import { ErrorFactory } from '@/presentation/helpers/errors'

export class AddAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly useCase: AddAccount
  ) { }

  async handle(request: AddAccountController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const { name, email, password } = request
      const account = await this.useCase.create({
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

export namespace AddAccountController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
