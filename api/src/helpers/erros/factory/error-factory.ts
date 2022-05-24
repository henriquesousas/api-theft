import { badRequest, forbidden, notFound, serverError } from '../../http/http'
import { HttpResponse } from '../../http/http-response'
import { EmailInUseError } from '../email-in-user-error'
import { MissingParamError } from '../missing-param-error'
import { NotFoundError } from '../not-found-error'

export class ErrorFactory {
  get(error: Error): HttpResponse {
    if (error instanceof NotFoundError) {
      return notFound()
    }

    if (error instanceof MissingParamError) {
      return badRequest(error)
    }

    if (error instanceof EmailInUseError) {
      return forbidden(error)
    }

    return serverError(error)
  }
}
