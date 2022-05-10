/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { expressRouterAdapter } from '../adapters/express-router-adapter'
import { buildSignupControllerFactory } from '../config/factories/controllers/signup-controller-factory'
import { makeLoginControllerFactory } from '../factories/controllers/login-controller.factory'

export default (router: Router): void => {
  router.use('/signup', expressRouterAdapter(buildSignupControllerFactory()))
  router.use('/auth', expressRouterAdapter(makeLoginControllerFactory()))
}
