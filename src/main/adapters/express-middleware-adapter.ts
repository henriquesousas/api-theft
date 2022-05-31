import { HttpRequest } from '../../controllers/import-protocols'
import { Middleware } from '../../presentation/protocols/middleware'
import { NextFunction, Request, Response } from 'express'

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
        success: false,
        error: {
          type: httpResponse.body.name,
          message: httpResponse.body.message
        }
      })
    }
  }
}
