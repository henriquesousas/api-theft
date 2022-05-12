import { SignupController } from '../../src/controllers/account/signup-controller'
import { ValidationRequiredField } from '../../src/validators/validation-required-field'
import { ValidationComposite } from '../../src/validators/validation-composite'
import { serverError } from '../../src/helpers/http/http'
import { AccountDto } from '../../src/domain/dto/account-dto'
import { Account } from '../../src/domain/models/account'
import { Validation, HttpRequest, AddAccount } from '../../src/controllers/import-protocols'

interface SutTypes {
  sut: SignupController
  validationStub: Validation
  addAccountUseCaseStub: AddAccount
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddAccountUseCaseStub = (): AddAccount => {
  class AddAccountUseCaseStub implements AddAccount {
    async add(dto: AccountDto): Promise<Account> {
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

const makeFakeRequest = (): HttpRequest => {
  const httpRequest = {
    body: {
      name: 'any_nam',
      email: 'any_email',
      password: 'any_password'
    }
  }
  return httpRequest
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addAccountUseCaseStub = makeAddAccountUseCaseStub()
  const sut = new SignupController(validationStub, addAccountUseCaseStub)
  return {
    sut,
    validationStub,
    addAccountUseCaseStub
  }
}

describe('SignupController', () => {
  test('deve chamar o validation com os valores corretos', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('deve chamar o AddAccountUseCase com os valores corretos', async () => {
    const { sut, addAccountUseCaseStub } = makeSut()
    const addAccountUseCaseSpy = jest.spyOn(addAccountUseCaseStub, 'add')
    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)
    expect(addAccountUseCaseSpy).toHaveBeenCalledWith(fakeRequest.body)
  })

  test('deve retornar null se o validation validar com sucesso', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)
    expect(validationSpy).toHaveBeenCalledWith(fakeRequest.body)
  })

  test('deve retornar uma exception se o validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('deve retornar uma exception se o AddAccountUseCase throws', async () => {
    const { sut, addAccountUseCaseStub } = makeSut()
    jest.spyOn(addAccountUseCaseStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
