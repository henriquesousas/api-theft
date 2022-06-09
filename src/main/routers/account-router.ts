/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { expressMiddlewareAdapter, expressRouterAdapter } from '@/main/adapters'
import {
  makeAddAccountControllerFactory,
  makeAuthControllerFactory,
  makeAuthMiddlewareFactory,
  makeUpdateAccountControllerFactory
} from '@/main/factories'

export default (router: Router): void => {
  const adminAuthMiddleware = expressMiddlewareAdapter(makeAuthMiddlewareFactory('admin'))
  router.post('/auth', expressRouterAdapter(makeAuthControllerFactory()))
  router.post('/account', expressRouterAdapter(makeAddAccountControllerFactory()))
  router.put('/account/:accountId', adminAuthMiddleware, expressRouterAdapter(makeUpdateAccountControllerFactory()))
}
