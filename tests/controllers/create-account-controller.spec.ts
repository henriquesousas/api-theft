import { CreateAccountController } from '../../src/controllers/account/create-account-controller'
import { serverError } from '../../src/helpers/http/http'
import { CreateAccount, Validation } from '../../src/controllers/import-protocols'
import { mockValidation } from '../validators/mocks'
import { mockCreateAccountRequest } from '../http'
import { mockCreateAccountUseCase } from '../data/usecases/mocks/mock-account-usecase'

type SutTypes = {
  sut: CreateAccountController
  validationStub: Validation
  addAccountUseCaseStub: CreateAccount
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addAccountUseCaseStub = mockCreateAccountUseCase()
  const sut = new CreateAccountController(validationStub, addAccountUseCaseStub)
  return {
    sut,
    validationStub,
    addAccountUseCaseStub
  }
}

describe('CreateAccountController', () => {
  test('Deve chamar o validation com os valores corretos', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockCreateAccountRequest())
    expect(validationSpy).toHaveBeenCalledWith(mockCreateAccountRequest())
  })

  test('Deve chamar o AddAccountUseCase com os valores corretos', async () => {
    const { sut, addAccountUseCaseStub } = mockSut()
    const addAccountUseCaseSpy = jest.spyOn(addAccountUseCaseStub, 'create')
    const httpRequest = mockCreateAccountRequest()
    await sut.handle(httpRequest)
    expect(addAccountUseCaseSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Deve retornar uma exception se o validation throws', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockCreateAccountRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Deve retornar uma exception se o AddAccountUseCase throws', async () => {
    const { sut, addAccountUseCaseStub } = mockSut()
    jest.spyOn(addAccountUseCaseStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockCreateAccountRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
