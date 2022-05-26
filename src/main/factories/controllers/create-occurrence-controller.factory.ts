import { Controller } from '../../../controllers/controller'
import { CreateOccurrenceController } from '../../../controllers/occurrence/create-occurrence-controller'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'
import { LogguerControllerDecorator } from '../../config/decorator/logguer-controller.decorator'
import { makeAddOccurrenceUseCaseFactory } from '../usecases/create-occurrence-usecase-factory'
import { makeAddOccurrenceValidationFactory } from '../validators/add-occurrence-validation-factory'

export const makeCreateOccurrenceControllerFactory = (): Controller => {
  const occurrenceController = new CreateOccurrenceController(makeAddOccurrenceUseCaseFactory(), makeAddOccurrenceValidationFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(occurrenceController, loguerRepository)
}
