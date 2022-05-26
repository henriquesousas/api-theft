import { CreateOccurrenceUsecase } from '../../../data/usecases/occurrence/create-ocurrence-usecase'
import { AccountMongoRepositoy } from '../../../infra/repository/account-mongo-repository'
import { OccurrenceMongoRepository } from '../../../infra/repository/occurrence-mongo-repository'

export const makeCreateOccurrenceUseCaseFactory = (): CreateOccurrenceUsecase => {
  const occurrenceMongoRepository = new OccurrenceMongoRepository()
  const loadAccountByIdRepository = new AccountMongoRepositoy()
  return new CreateOccurrenceUsecase(occurrenceMongoRepository, loadAccountByIdRepository)
}
