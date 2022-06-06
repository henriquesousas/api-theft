/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeLoadOccurrenceControllerFactory } from '../factories/controllers/load-occurrence-controller.factory'
import { expressRouterAdapter } from '../adapters/express-router-adapter'
import { makeCreateOccurrenceControllerFactory } from '../factories/controllers/add-occurrence-controller.factory'
import { expressMiddlewareAdapter } from '../adapters'
import { makeAuthMiddlewareFactory } from '../factories'

export default (router: Router): void => {
  const adminAuth = expressMiddlewareAdapter(makeAuthMiddlewareFactory('admin'))
  router.post('/occurrence', adminAuth, expressRouterAdapter(makeCreateOccurrenceControllerFactory()))
  router.get('/occurrence/:occurrenceId', adminAuth, expressRouterAdapter(makeLoadOccurrenceControllerFactory()))
}
