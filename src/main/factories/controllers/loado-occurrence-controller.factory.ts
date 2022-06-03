import { LoadOccurrenceController } from '../../../presentation/controllers/occurrences/load-occurrence-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'
import { LogguerControllerDecorator } from '../../decorator/logguer-controller.decorator'
import { makeLoadOccurrenceUseCaseFactory } from '../usecases/load-occurrence-usecase-factory'

export const makeLoadOccurrenceControllerFactory = (): Controller => {
  const loadOccurrenceController = new LoadOccurrenceController(makeLoadOccurrenceUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(loadOccurrenceController, loguerRepository)
}
