import { Controller } from '@/presentation/protocols/controller'
import { LoadOccurrenceController } from '@/presentation/controllers/occurrences/load-occurrence-controller'
import { LogguerMongoRepository } from '@/infra/repository/logguer-mongo-repository'
import { LogControllerDecorator } from '@/main/decorator/log-controller.decorator'
import { makeLoadOccurrenceUseCaseFactory } from '../usecases/load-occurrence-usecase-factory'

export const makeLoadOccurrenceControllerFactory = (): Controller => {
  const loadOccurrenceController = new LoadOccurrenceController(makeLoadOccurrenceUseCaseFactory())
  const loguerRepository = new LogguerMongoRepository()
  return new LogControllerDecorator(loadOccurrenceController, loguerRepository)
}
