import { Controller } from '../../../controllers/import-protocols'
import { LoginController } from '../../../controllers/account/login-account-controller'
import { makeLoginUseCaseFactory } from '../usecases/login-usecase-factory'
import { makeLoginValidatorFactory } from '../validators/login-validator-factory'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'
import { LogguerControllerDecorator } from '../../config/decorator/logguer-controller.decorator'

export const makeLoginControllerFactory = (): Controller => {
  const controller = new LoginController(makeLoginValidatorFactory(), makeLoginUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(controller, loguerRepository)
}
