import { Validation } from '../../src/domain/validators/validation'
import { HttpRequest } from '../../src/helpers/http/http-request'
import { SignupController } from '../../src/controllers/signup/signup-controller'
import { ValidationRequiredField } from '../../src/validators/validation-required-field'
import { ValidationComposite } from '../../src/validators/validation-composite'
import { serverError } from '../../src/helpers/http/http'
import { AddAccountUseCase } from '../../src/domain/usecases/add-account-usecase'
import { AccountDto } from '../../src/domain/dto/account-dto'
import { Account } from '../../src/domain/models/account'

interface SutTypes {
  sut: SignupController
  compositeValidationStub: Validation
  addAccountUseCaseStub: AddAccountUseCase
}

const buildCompositeValidationStub = (): Validation => {
  const validators = [new ValidationRequiredField('name')]
  return new ValidationComposite(validators)
}

const buildAddAccountUseCaseStub = (): AddAccountUseCase => {
  class AddAccountUseCaseStub implements AddAccountUseCase {
    async add (dto: AccountDto): Promise<Account> {
      const account: Account = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
      return account
    }
  }
  return new AddAccountUseCaseStub()
}

const buildFakeRequest = (): HttpRequest => {
  const httpRequest = {
    body: {
      name: 'any_nam',
      email: 'any_email',
      password: 'any_password'
    }
  }
  return httpRequest
}

const buildSut = (): SutTypes => {
  const compositeValidationStub = buildCompositeValidationStub()
  const addAccountUseCaseStub = buildAddAccountUseCaseStub()
  const sut = new SignupController(compositeValidationStub, addAccountUseCaseStub)
  return {
    sut,
    compositeValidationStub,
    addAccountUseCaseStub
  }
}

describe('SignupController', () => {
  test('deve chamar o CompositeValidation com o valores corretos', async () => {
    const { sut, compositeValidationStub } = buildSut()
    const validateSpy = jest.spyOn(compositeValidationStub, 'validate')
    await sut.handle(buildFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(buildFakeRequest().body)
  })

  test('deve chamar o AddAccountUseCase com o valores corretos', async () => {
    const { sut, addAccountUseCaseStub } = buildSut()
    const addAccountUseCaseSpy = jest.spyOn(addAccountUseCaseStub, 'add')
    await sut.handle(buildFakeRequest())
    expect(addAccountUseCaseSpy).toHaveBeenCalledWith(buildFakeRequest().body)
  })

  test('deve retornar null se o CompositeValidation passar', async () => {
    const { sut, compositeValidationStub } = buildSut()
    const validateSpy = jest.spyOn(compositeValidationStub, 'validate')
    await sut.handle(buildFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(buildFakeRequest().body)
  })

  test('deve retornar serverError (exceção) se o validation throws', async () => {
    const { sut, compositeValidationStub } = buildSut()
    jest.spyOn(compositeValidationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(buildFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('deve retornar serverError (exceção) se o AddAccountUseCase throws', async () => {
    const { sut, addAccountUseCaseStub } = buildSut()
    jest.spyOn(addAccountUseCaseStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(buildFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
