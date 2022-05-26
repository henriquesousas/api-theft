/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeCreateAccountControllerFactory } from '../factories/controllers/create-account-controller-factory'
import { expressRouterAdapter } from '../adapters/express-router-adapter'
import { makeLoginControllerFactory } from '../factories/controllers/login-controller.factory'

export default (router: Router): void => {
  router.use('/signup', expressRouterAdapter(makeCreateAccountControllerFactory()))
  router.use('/auth', expressRouterAdapter(makeLoginControllerFactory()))
}
