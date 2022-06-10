import { Controller, HttpResponse } from '@/presentation/protocols'
import { UpdateAccount } from '@/domain/usecases/account'
import { error, serverError, success } from '@/presentation/helpers/http/http'
import { Validation } from '@/domain/validators'

export class UpdateAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateAccountUseCase: UpdateAccount) {
  }

  async handle(request: UpdateAccountController.Request): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(request)
      if (validationResult.isLeft()) {
        return error(validationResult.value)
      }
      const { accountId, name, email } = request
      await this.updateAccountUseCase.update({
        accountId,
        name,
        email
      })
      return success({ message: 'success' })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateAccountController {
  export type Request = {
    accountId: string
    name: string
    email: string
  }
}
