import { Controller } from '../../../controllers/import-protocols'
import { AddAccountController } from '../../../presentation/controllers/account/add-account-controller'
import { makeCreateAccounttUseCaseFactory } from '../usecases/create-account-usecase-factory'
import { makeCreateAccountValidatorFactory } from '../validators/signup-validator-factory'
import { LogguerControllerDecorator } from '../../config/decorator/logguer-controller.decorator'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'

export const makeCreateAccountControllerFactory = (): Controller => {
  const createAccountController = new AddAccountController(makeCreateAccountValidatorFactory(), makeCreateAccounttUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(createAccountController, loguerRepository)
}
