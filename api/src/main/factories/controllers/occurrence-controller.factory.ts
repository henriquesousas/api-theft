import { Controller } from '../../../controllers/controller'
import { Validation } from '../../../controllers/import-protocols'
import { OccurrenceController } from '../../../controllers/occurrence/occurrence-controller'
import { AddOccurrenceUsecase } from '../../../data/usecases/occurrence/add-ocurrence-usecase'
import { AccountMongoRepositoy } from '../../../infra/repository/account-mongo-repository'
import { LogguerMongoRepository } from '../../../infra/repository/logguer-mongo-repository'
import { OccurrenceMongoRepository } from '../../../infra/repository/occurrence-mongo-repository'
import { ValidationComposite } from '../../../validators/validation-composite'
import { ValidationRequiredField } from '../../../validators/validation-required-field'
import { LogguerControllerDecorator } from '../../config/decorator/logguer-controller.decorator'

// TODO: Make factories
export const makeOccurrenceControllerFactory = (): Controller => {
  const occurrenceMongoRepository = new OccurrenceMongoRepository()
  const loadAccountByIdRepository = new AccountMongoRepositoy()
  const usecase = new AddOccurrenceUsecase(occurrenceMongoRepository, loadAccountByIdRepository)
  const validations: Validation[] = []
  for (const field of ['userId', 'title', 'description', 'product', 'dateOccurrence']) {
    validations.push(new ValidationRequiredField(field))
  }
  const validation = new ValidationComposite(validations)
  const occurrenceController = new OccurrenceController(usecase, validation)
  const loguerRepository = new LogguerMongoRepository()
  return new LogguerControllerDecorator(occurrenceController, loguerRepository)
}
