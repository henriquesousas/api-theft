import { HttpRequest, HttpResponse } from '../helpers/http/http'

export interface Controller {
  handle (request: HttpRequest): Promise<HttpResponse | null>
}
