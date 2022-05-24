
import { LoadOccurrenceById } from '../../domain/usecases/occurrence/load-occurrence-by-id'
import { serverError, sucess } from '../../helpers/http/http'
import { HttpRequest, HttpResponse, Controller } from '../import-protocols'

export class LoadOccurrenceController implements Controller {
  constructor(private readonly loadOccurrenceByIdUseCase: LoadOccurrenceById) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const occurrence = await this.loadOccurrenceByIdUseCase.loadById(request.params.occurrenceId)
      return sucess(occurrence)
    } catch (error) {
      return serverError(error)
    }
  }
}
