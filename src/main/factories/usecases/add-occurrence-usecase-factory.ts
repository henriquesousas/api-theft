import { AddOccurrenceUseCase } from '@/data/usecases/occurrence/add-occurrence-usecase'
import { AccountMongoRepository } from '@/infra/repository/account-mongo-repository'
import { OccurrenceMongoRepository } from '../../../infra/repository/occurrence-mongo-repository'

export const makeAddOccurrenceUseCaseFactory = (): AddOccurrenceUseCase => {
  const occurrenceMongoRepository = new OccurrenceMongoRepository()
  const loadAccountByIdRepository = new AccountMongoRepository()
  return new AddOccurrenceUseCase(occurrenceMongoRepository, loadAccountByIdRepository)
}
