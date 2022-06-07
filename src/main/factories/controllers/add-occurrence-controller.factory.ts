import { Controller } from '@/presentation/protocols/controller'
import { AddOccurrenceController } from '@/presentation/controllers/occurrences/add-occurrence-controller'
import { LogguerMongoRepository } from '@/infra/repository/logguer-mongo-repository'
import { LogControllerDecorator } from '@/main/decorator/log-controller.decorator'
import { makeAddOccurrenceValidationFactory } from '@/main/factories/validators/add-occurrence-validation-factory'
import { makeAddOccurrenceUseCaseFactory } from '../usecases/add-occurrence-usecase-factory'

export const makeCreateOccurrenceControllerFactory = (): Controller => {
  const occurrenceController = new AddOccurrenceController(makeAddOccurrenceUseCaseFactory(), makeAddOccurrenceValidationFactory())
  const logRepository = new LogguerMongoRepository()
  return new LogControllerDecorator(occurrenceController, logRepository)
}
