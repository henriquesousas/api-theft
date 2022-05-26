/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeLoadOccurrenceControllerFactory } from 'main/factories/controllers/loado-occurrence-controller.factory'
import { expressRouterAdapter } from '../adapters/express-router-adapter'
import { makeCreateOccurrenceControllerFactory } from '../factories/controllers/create-occurrence-controller.factory'

export default (router: Router): void => {
  router.use('/occurrence', expressRouterAdapter(makeCreateOccurrenceControllerFactory()))
  router.use('/occurrence/{id}', expressRouterAdapter(makeLoadOccurrenceControllerFactory()))
}
