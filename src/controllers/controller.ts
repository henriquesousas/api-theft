import { HttpResponse } from '../helpers/http/http-response'

export interface Controller<T = any> {
  handle (request: T): Promise<HttpResponse>
}
