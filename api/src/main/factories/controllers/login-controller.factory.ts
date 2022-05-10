import { Controller } from '../../../controllers'
import { AuthenticationController } from '../../../controllers/account/authentication-controller'
import { makeLoginUseCaseFactory } from '../usecases/login-usecase-factory'
import { makeLoginValidatorFactory } from '../validators/login-validator-factory'

export const makeLoginControllerFactory = (): Controller => {
  return new AuthenticationController(makeLoginValidatorFactory(), makeLoginUseCaseFactory())
}
