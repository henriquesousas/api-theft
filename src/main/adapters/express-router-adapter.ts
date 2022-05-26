import { Controller, HttpRequest } from '../../controllers/import-protocols'
import { Request, Response } from 'express'

export const expressRouterAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
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
