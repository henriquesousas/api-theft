import { sucess } from '../../helpers/http/http'
import { ErrorFactory } from '../../helpers/errors'
import { AddOccurrence } from '../../../domain/usecases/occurrence'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/domain/validators'
import { Address } from '@/domain/models/address'

export class AddOccurrenceController implements Controller {
  constructor(
    private readonly usecase: AddOccurrence,
    private readonly validation: Validation) { }

  async handle(request: AddOccurrenceController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const { userId, title, description, address, product, dateOccurrence } = request
      const occurrenceId = await this.usecase.add({
        userId,
        title,
        description,
        address,
        product,
        dateOccurrence
      })
      return sucess({ id: occurrenceId })
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
