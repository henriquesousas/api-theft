import { sucess } from '../../helpers/http/http'
import { ErrorFactory } from '../../helpers/errors'
import { CreateOccurrence } from '../../../domain/usecases/occurrence'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/domain/validators'
import { Address } from '@/domain/models/address'

export class AddOccurrenceController implements Controller {
  constructor(
    private readonly createOccurrenceUseCase: CreateOccurrence,
    private readonly validation: Validation) { }

  async handle(request: AddOccurrenceController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const { userId, title, description, address, product, dateOccurrence } = request
      await this.createOccurrenceUseCase.add({
        userId,
        title,
        description,
        address,
        product,
        dateOccurrence
      })
      return sucess({
        status: true,
        message: 'Ocorrência cadastrada com sucesso'
      })
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}

export namespace AddOccurrenceController {
  export type Request = {
    userId: string
    title: string
    description: string
    address: Address
    product: number
    dateOccurrence: Date
  }
}
