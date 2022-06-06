import { Controller } from '../../../presentation/protocols/controller'
import { AddOccurrenceController } from '../../../presentation/controllers/occurrences/add-occurrence-controller'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'
import { LogguerControllerDecorator } from '../../decorator/logguer-controller.decorator'
import { makeAddOccurrenceUseCaseFactory } from '../usecases/add-occurrence-usecase-factory'
import { makeAddOccurrenceValidationFactory } from '../validators/add-occurrence-validation-factory'

export const makeCreateOccurrenceControllerFactory = (): Controller => {
  const occurrenceController = new AddOccurrenceController(makeAddOccurrenceUseCaseFactory(), makeAddOccurrenceValidationFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(occurrenceController, loguerRepository)
}
