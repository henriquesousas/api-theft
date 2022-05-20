/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { expressRouterAdapter } from '../adapters/express-router-adapter'
import { makeOccurrenceControllerFactory } from '../factories/controllers/occurrence-controller.factory'

export default (router: Router): void => {
  router.use('/occurrence', expressRouterAdapter(makeOccurrenceControllerFactory()))
}
