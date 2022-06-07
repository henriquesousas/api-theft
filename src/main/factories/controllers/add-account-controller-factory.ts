import { Controller } from '@/presentation/protocols'
import { makeCreateAccounttUseCaseFactory } from '@/main/factories/usecases/add-account-usecase-factory'
import { makeCreateAccountValidatorFactory } from '@/main/factories/validators/signup-validator-factory'
import { LogControllerDecorator } from '@/main/decorator/log-controller.decorator'
import { AddAccountController } from '@/presentation/controllers/account/add-account-controller'
import { LogguerMongoRepository } from '@/infra/repository/logguer-mongo-repository'

export const makeAddAccountControllerFactory = (): Controller => {
  return new LogControllerDecorator(
    new AddAccountController(makeCreateAccountValidatorFactory(), makeCreateAccounttUseCaseFactory()),
    new LogguerMongoRepository())
}
