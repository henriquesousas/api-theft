import { LoadOccurrenceController } from '../../../controllers/occurrence/load-occurrence-controller'
import { Controller } from '../../../controllers/controller'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'
import { LogguerControllerDecorator } from '../../config/decorator/logguer-controller.decorator'
import { makeLoadOccurrenceUseCaseFactory } from '../usecases/load-occurrence-usecase-factory'

export const makeLoadOccurrenceControllerFactory = (): Controller => {
  const loadOccurrenceController = new LoadOccurrenceController(makeLoadOccurrenceUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(loadOccurrenceController, loguerRepository)
}
