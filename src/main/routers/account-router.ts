/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeAddAccountControllerFactory } from '../factories/controllers/add-account-controller-factory'
import { expressRouterAdapter } from '../adapters/express-router-adapter'
import { makeAuthControllerFactory } from '../factories/controllers/auth-controller.factory'

export default (router: Router): void => {
  // const adminAuth = expressMiddlewareAdapter(makeAuthMiddlewareFactory('admin'))
  router.post('/signup', expressRouterAdapter(makeAddAccountControllerFactory()))
  router.post('/auth', expressRouterAdapter(makeAuthControllerFactory()))
}
