import { Controller, HttpResponse } from '@/presentation/protocols'
import { UpdateAccount } from '@/domain/usecases/account'
import { success } from '@/presentation/helpers/http/http'
import { ErrorFactory } from '@/presentation/helpers/errors'
import { Validation } from '@/domain/validators'
export class UpdateAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateAccountUseCase: UpdateAccount) {
  }

  async handle (request: UpdateAccountController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const {
        accountId,
        name,
        email
      } = request
      await this.updateAccountUseCase.update({
        accountId,
        name,
        email
      })
      return success({
        message: 'Conta alterada com sucesso'
      })
    } catch (error) {
      return new ErrorFactory().get(error)
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
