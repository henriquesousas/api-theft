/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeAddAccountControllerFactory } from '@/main/factories/controllers/add-account-controller-factory'
import { expressRouterAdapter } from '@/main/adapters'
import { makeAuthControllerFactory } from '@/main/factories'

export default (router: Router): void => {
  router.post('/account/create', expressRouterAdapter(makeAddAccountControllerFactory()))
  router.post('/auth', expressRouterAdapter(makeAuthControllerFactory()))
}
