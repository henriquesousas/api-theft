
import { ErrorFactory } from '@/presentation/helpers/errors/error-factory'
import { LoadOccurrenceById } from '@/domain/usecases/occurrence/load-occurrence-by-id'
import { success } from '@/presentation/helpers/http/http'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadOccurrenceController implements Controller {
  constructor(private readonly useCase: LoadOccurrenceById) { }

  async handle(request: LoadOccurrenceController.Request): Promise<HttpResponse> {
    try {
      const occurrence = await this.useCase.loadById(request.occurrenceId)
      return success(occurrence)
    } catch (error) {
      return new ErrorFactory().get(error)
    }
  }
}

export namespace LoadOccurrenceController {
  export type Request = {
    occurrenceId: string
  }
}
