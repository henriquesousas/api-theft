import { Controller } from '../../../controllers/import-protocols'
import { makeCreateAccounttUseCaseFactory } from '@/main/factories/usecases/create-account-usecase-factory'
import { makeCreateAccountValidatorFactory } from '@/main/factories/validators/signup-validator-factory'
import { LogguerControllerDecorator } from '@/main/config/decorator/logguer-controller.decorator'
import { AddAccountController } from '@/presentation/controllers/account/add-account-controller'
import { LogguerMongoRepository } from '@/infra/repository/logguer-mongo-repository'

export const makeCreateAccountControllerFactory = (): Controller => {
  const createAccountController = new AddAccountController(makeCreateAccountValidatorFactory(), makeCreateAccounttUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(createAccountController, loguerRepository)
}
