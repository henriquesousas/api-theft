import { sucess } from '../../helpers/http/http'
import { ErrorFactory } from '../../helpers/errors'
import { AddOccurrence } from '../../../domain/usecases/occurrence'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/domain/validators'
import { Address } from '@/domain/models/address'

export class AddOccurrenceController implements Controller {
  constructor(
    private readonly useCase: AddOccurrence,
    private readonly validation: Validation) { }

  async handle(request: AddOccurrenceController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const { userId, title, description, address, product, dateOccurrence } = request
      const occurrenceId = await this.useCase.add({
        userId,
        title,
        description,
        address,
        product,
        dateOccurrence
      })
      return sucess({
        success: true,
        id: occurrenceId
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
