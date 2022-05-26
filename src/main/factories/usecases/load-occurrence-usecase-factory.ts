import { LoadOccurrenceByIdUseCase } from 'data/usecases/occurrence/load-occurrence-by-id-usecase'
import { LoadOccurrenceById } from 'domain/usecases/occurrence/load-occurrence-by-id'
import { OccurrenceMongoRepository } from 'infra/repository/occurrence-mongo-repository'

export const makeLoadOccurrenceUseCaseFactory = (): LoadOccurrenceById => {
  const loadOccurrenceByIdRepository = new OccurrenceMongoRepository()
  return new LoadOccurrenceByIdUseCase(loadOccurrenceByIdRepository)
}
