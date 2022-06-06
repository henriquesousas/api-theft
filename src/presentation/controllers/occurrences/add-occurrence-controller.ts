import { Validation } from '@/domain/validators'
import { AddOccurrence } from '@/domain/usecases/occurrence'
import { Address } from '@/domain/models/address'
import { ErrorFactory } from '@/presentation/helpers/errors'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { sucess } from '@/presentation/helpers/http/http'

export class AddOccurrenceController implements Controller {
  constructor(
    private readonly usecase: AddOccurrence,
    private readonly validation: Validation) { }

  async handle(request: AddOccurrenceController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const { userId, title, description, address, product, dateOfOccurrence } = request
      const createdAt = new Date()
      const occurrenceId = await this.usecase.add({
        userId,
        title,
        description,
        address,
        product,
        dateOfOccurrence,
        createdAt,
        updateaAt: createdAt
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
    dateOfOccurrence: Date
  }
}
