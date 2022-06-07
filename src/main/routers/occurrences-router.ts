/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { expressMiddlewareAdapter, expressRouterAdapter } from '@/main/adapters'
import { makeAuthMiddlewareFactory } from '@/main/factories/middleware/auth-middleware.factory'
import { makeLoadOccurrenceControllerFactory } from '../factories/controllers/load-occurrence-controller.factory'
import { makeCreateOccurrenceControllerFactory } from '../factories/controllers/add-occurrence-controller.factory'

export default (router: Router): void => {
  const adminAuthMiddleware = expressMiddlewareAdapter(makeAuthMiddlewareFactory('admin'))
  router.post('/occurrence/create', adminAuthMiddleware, expressRouterAdapter(makeCreateOccurrenceControllerFactory()))
  router.get('/occurrence/:occurrenceId', adminAuthMiddleware, expressRouterAdapter(makeLoadOccurrenceControllerFactory()))
}
