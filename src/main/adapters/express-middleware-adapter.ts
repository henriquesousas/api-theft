import { NextFunction, Request, Response } from 'express'
import { Middleware, HttpRequest } from '@/presentation/protocols'

export const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request: HttpRequest = {
      headers: req.headers
    }

    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        message: httpResponse.body.message
      })
    }
  }
}
