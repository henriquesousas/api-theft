import { Controller } from '../../../controllers'
import { SignupController } from '../../../controllers/signup-controller'
import { makeAddAccountUseCaseFactory } from '../usecases/add-account-usecase-factory'
import { makeSignupValidatorFactory } from '../validators/signup-validator-factory'

export const makeSignupControllerFactory = (): Controller => {
  return new SignupController(makeSignupValidatorFactory(), makeAddAccountUseCaseFactory())
}
