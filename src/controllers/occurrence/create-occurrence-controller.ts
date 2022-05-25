import { Controller, HttpRequest, HttpResponse, Validation } from '../import-protocols'
import { CreateOccurrence } from '../../domain/usecases/occurrence/create-occurrence'
import { sucess } from '../../helpers/http/http'
import { ErrorFactory } from '../../helpers/erros/factory/error-factory'

export class CreateOccurrenceController implements Controller {
  constructor(
    private readonly createOccurrenceUseCase: CreateOccurrence,
    private readonly validation: Validation) { }

  // TODO: refactor return
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(request.body)
      const { userId, title, description, address, product, dateOccurrence } = request.body
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
