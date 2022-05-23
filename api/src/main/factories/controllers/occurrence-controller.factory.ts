import { Controller } from '../../../controllers/controller'
import { OccurrenceController } from '../../../controllers/occurrence/occurrence-controller'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'
import { LogguerControllerDecorator } from '../../config/decorator/logguer-controller.decorator'
import { makeAddOccurrenceUseCaseFactory } from '../usecases/add-occurrence-usecase-factory'
import { makeAddOccurrenceValidationFactory } from '../validators/add-occurrence-validation-factory'

export const makeOccurrenceControllerFactory = (): Controller => {
  const occurrenceController = new OccurrenceController(makeAddOccurrenceUseCaseFactory(), makeAddOccurrenceValidationFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(occurrenceController, loguerRepository)
}
