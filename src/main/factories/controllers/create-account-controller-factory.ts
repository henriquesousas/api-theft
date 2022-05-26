import { Controller } from '../../../controllers/import-protocols'
import { CreateAccountController } from '../../../controllers/account/create-account-controller'
import { makeAddAccountUseCaseFactory } from '../usecases/add-account-usecase-factory'
import { makeSignupValidatorFactory } from '../validators/signup-validator-factory'
import { LogguerControllerDecorator } from '../../config/decorator/logguer-controller.decorator'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'

export const makeCreateAccountControllerFactory = (): Controller => {
  const signupController = new CreateAccountController(makeSignupValidatorFactory(), makeAddAccountUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(signupController, loguerRepository)
}
