import { Controller, HttpRequest, HttpResponse, Validation } from '../import-protocols'
import { AddOccurrence } from '../../domain/usecases/occurrence/add-occurrence'
import { serverError, sucess } from '../../helpers/http/http'

export class CreateOccurrenceController implements Controller {
  constructor(
    private readonly addOccurrenceUseCase: AddOccurrence,
    private readonly validation: Validation) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(request.body)
      // if (error) {
      //   return badRequest(error)
      // }
      const { userId, title, description, address, product, dateOccurrence } = request.body
      await this.addOccurrenceUseCase.add({
        userId,
        title,
        description,
        address,
        product,
        dateOccurrence
      })
      return sucess('Ocorrência cadastrada com sucesso')
    } catch (error) {
      return serverError(error)
    }
  }
}
