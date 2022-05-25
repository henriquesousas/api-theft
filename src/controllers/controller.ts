import { HttpRequest } from '../helpers/http/http-request'
import { HttpResponse } from '../helpers/http/http-response'

export interface Controller {
  handle (request: HttpRequest): Promise<HttpResponse>
}
