import { Controller } from '../../../controllers/import-protocols'
import { CreateAccountController } from '../../../controllers/account/create-account-controller'
import { makeCreateAccounttUseCaseFactory } from '../usecases/add-account-usecase-factory'
import { makeCreateAccountValidatorFactory } from '../validators/signup-validator-factory'
import { LogguerControllerDecorator } from '../../config/decorator/logguer-controller.decorator'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'

export const makeCreateAccountControllerFactory = (): Controller => {
  const createAccountController = new CreateAccountController(makeCreateAccountValidatorFactory(), makeCreateAccounttUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(createAccountController, loguerRepository)
}
