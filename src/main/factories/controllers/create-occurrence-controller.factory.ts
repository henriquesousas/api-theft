import { Controller } from '../../../presentation/protocols/controller'
import { AddOccurrenceController } from '../../../presentation/controllers/occurrences/add-occurrence-controller'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'
import { LogguerControllerDecorator } from '../../decorator/logguer-controller.decorator'
import { makeCreateOccurrenceUseCaseFactory } from '../usecases/create-occurrence-usecase-factory'
import { makeAddOccurrenceValidationFactory } from '../validators/add-occurrence-validation-factory'

export const makeCreateOccurrenceControllerFactory = (): Controller => {
  const occurrenceController = new AddOccurrenceController(makeCreateOccurrenceUseCaseFactory(), makeAddOccurrenceValidationFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(occurrenceController, loguerRepository)
}
