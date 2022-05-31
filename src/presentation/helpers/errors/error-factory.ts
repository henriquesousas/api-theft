import { badRequest, forbidden, notFound, serverError, unauthorized } from '../http/http'
import { HttpResponse } from '../../protocols/http-response'
import { EmailInUseError } from './email-in-user-error'
import { InvalidParamError } from './invalid-param-error'
import { MissingParamError } from './missing-param-error'
import { NotFoundError } from './not-found-error'
import { JsonWebTokenError } from 'jsonwebtoken'

// TODO: Refactor
export class ErrorFactory {
  get(error: Error): HttpResponse {
    if (error instanceof NotFoundError) {
      return notFound()
    }

    if (error instanceof MissingParamError || error instanceof InvalidParamError) {
      return badRequest(error)
    }

    if (error instanceof EmailInUseError) {
      return forbidden(error)
    }

    if (error instanceof JsonWebTokenError) {
      return unauthorized()
    }

    return serverError(error)
  }
}
