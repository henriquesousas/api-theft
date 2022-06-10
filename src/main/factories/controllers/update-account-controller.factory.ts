import { Controller } from '@/presentation/protocols/controller'
import { LogguerMongoRepository } from '@/infra/repository/logguer-mongo-repository'
import { LogControllerDecorator } from '@/main/decorator/log-controller.decorator'
import { UpdateAccountController } from '@/presentation/controllers/account'
import { UpdateAccountUseCase } from '@/data/usecases/account/update/update-account-usecase'
import { AccountMongoRepository } from '@/infra/repository/account-mongo-repository'
import { ValidationComposite, ValidationRequiredField } from '@/validators'
import { Validation } from '@/domain/validators'

export const makeUpdateAccountControllerFactory = (): Controller => {
  const validations: Validation[] = []
  for (const field of ['name', 'email']) {
    validations.push(new ValidationRequiredField(field))
  }
  const validation = new ValidationComposite(validations)
  const updateAccountRepository = new AccountMongoRepository()
  const updateAccountUseCase = new UpdateAccountUseCase(updateAccountRepository)
  const updateAccountController = new UpdateAccountController(validation, updateAccountUseCase)
  const logRepository = new LogguerMongoRepository()
  return new LogControllerDecorator(updateAccountController, logRepository)
}
