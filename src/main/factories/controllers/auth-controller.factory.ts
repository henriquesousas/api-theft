import { Controller } from '@/presentation/protocols/controller'
import { AuthController } from '@/presentation/controllers/account'
import { makeAuthUseCaseFactory } from '@/main/factories/usecases/auth-usecase-factory'
import { makeAuthValidatorFactory } from '@/main/factories/validators/auth-validator-factory'
import { LogguerControllerDecorator } from '@/main/decorator/logguer-controller.decorator'
import { LogguerMongoRepository } from '@/infra/repository/logguer-mongo-repository'

export const makeAuthControllerFactory = (): Controller => {
  const controller = new AuthController(makeAuthValidatorFactory(), makeAuthUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(controller, loguerRepository)
}
