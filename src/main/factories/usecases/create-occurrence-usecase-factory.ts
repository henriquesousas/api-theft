import { AddOccurrenceUsecase } from '../../../data/usecases/occurrence/add-ocurrence-usecase'
import { AccountMongoRepositoy } from '../../../infra/repository/account-mongo-repository'
import { OccurrenceMongoRepository } from '../../../infra/repository/occurrence-mongo-repository'

export const makeCreateOccurrenceUseCaseFactory = (): AddOccurrenceUsecase => {
  const occurrenceMongoRepository = new OccurrenceMongoRepository()
  const loadAccountByIdRepository = new AccountMongoRepositoy()
  return new AddOccurrenceUsecase(occurrenceMongoRepository, loadAccountByIdRepository)
}
