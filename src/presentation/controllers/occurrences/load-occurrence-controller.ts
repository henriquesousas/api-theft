
import { ErrorFactory } from '../../helpers/errors/error-factory'
import { LoadOccurrenceById } from '../../../domain/usecases/occurrence/load-occurrence-by-id'
import { sucess } from '../../helpers/http/http'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadOccurrenceController implements Controller {
  constructor(private readonly usecase: LoadOccurrenceById) { }

  async handle(request: LoadOccurrenceController.Request): Promise<HttpResponse> {
    try {
      const occurrence = await this.usecase.loadById(request.occurrenceId)
      return sucess(occurrence)
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
