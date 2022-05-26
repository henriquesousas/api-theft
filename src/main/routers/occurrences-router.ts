/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeLoadOccurrenceControllerFactory } from '../factories/controllers/loado-occurrence-controller.factory'
import { expressRouterAdapter } from '../adapters/express-router-adapter'
import { makeCreateOccurrenceControllerFactory } from '../factories/controllers/create-occurrence-controller.factory'

export default (router: Router): void => {
  router.post('/occurrence', expressRouterAdapter(makeCreateOccurrenceControllerFactory()))
  router.get('/occurrence/:occurrenceId', expressRouterAdapter(makeLoadOccurrenceControllerFactory()))
}
