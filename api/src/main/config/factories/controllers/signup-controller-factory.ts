import { Controller } from '../../../../controllers'
import { SignupController } from '../../../../controllers/signup/signup-controller'
import { buildAddAccountUseCaseFactory } from '../usecases/add-account-usecase-factory'
import { buildSignupValidatorFactory } from '../validators/signup-validator-factory'

export const buildSignupControllerFactory = (): Controller => {
  return new SignupController(buildSignupValidatorFactory(), buildAddAccountUseCaseFactory())
}
