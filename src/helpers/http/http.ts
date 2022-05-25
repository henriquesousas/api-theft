import { NotFoundError } from '../erros/not-found-error'
import { ServerError } from '../erros/server-error'
import { UnauthorizedError } from '../erros/unauthorized-error'
import { HttpResponse } from './http-response'

export const sucess = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const forbidden = (error: Error): HttpResponse => {
  return {
    statusCode: 403,
    body: error
  }
}

export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export const notFound = (): HttpResponse => {
  return {
    statusCode: 404,
    body: new NotFoundError()
  }
}

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}
