import { Controller } from '../../../controllers'
import { LoginController } from '../../../controllers/login-controller'
import { makeLoginUseCaseFactory } from '../usecases/login-usecase-factory'
import { makeLoginValidatorFactory } from '../validators/login-validator-factory'

export const makeLoginControllerFactory = (): Controller => {
  return new LoginController(makeLoginValidatorFactory(), makeLoginUseCaseFactory())
}
