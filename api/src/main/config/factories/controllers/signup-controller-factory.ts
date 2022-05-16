import { Controller } from '../../../../controllers/import-protocols'
import { SignupController } from '../../../../controllers/account/signup-controller'
import { makeAddAccountUseCaseFactory } from '../usecases/add-account-usecase-factory'
import { makeSignupValidatorFactory } from '../validators/signup-validator-factory'
import { LogguerControllerDecorator } from '../../decorator/logguer-controller.decorator'
import { LogguerMongoRepository } from '../../../../infra/repository/logguer-mongo-repository'

export const makeSignupControllerFactory = (): Controller => {
  const controller = new SignupController(makeSignupValidatorFactory(), makeAddAccountUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(controller, loguerRepository)
}
