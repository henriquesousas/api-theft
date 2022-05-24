import { SignupController } from '../../../src/controllers/account/signup-controller'
import { forbidden, serverError } from '../../../src/helpers/http/http'
import { AddAccount, Validation } from '../../../src/controllers/import-protocols'
import { EmailInUseError } from '../../../src/helpers/erros/email-in-user-error'
import { mockAddAccountUseCase } from '../../data/usecases/mocks'
import { mockValidation } from '../../validators/mocks'
import { mockAccountRequest } from '../../http'

type SutTypes = {
  sut: SignupController
  validationStub: Validation
  addAccountUseCaseStub: AddAccount
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addAccountUseCaseStub = mockAddAccountUseCase()
  const sut = new SignupController(validationStub, addAccountUseCaseStub)
  return {
    sut,
    validationStub,
    addAccountUseCaseStub
  }
}

describe('SignupController', () => {
  test('deve chamar o validation com os valores corretos', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockAccountRequest())
    expect(validationSpy).toHaveBeenCalledWith(mockAccountRequest().body)
  })

  test('deve chamar o AddAccountUseCase com os valores corretos', async () => {
    const { sut, addAccountUseCaseStub } = mockSut()
    const addAccountUseCaseSpy = jest.spyOn(addAccountUseCaseStub, 'add')
    const fakeRequest = mockAccountRequest()
    await sut.handle(fakeRequest)
    expect(addAccountUseCaseSpy).toHaveBeenCalledWith(fakeRequest.body)
  })

  test('deve retornar null se o validation validar com sucesso', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const fakeRequest = mockAccountRequest()
    await sut.handle(fakeRequest)
    expect(validationSpy).toHaveBeenCalledWith(fakeRequest.body)
  })

  test('deve retornar uma exception se o validation throws', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockAccountRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('deve retornar uma exception se o AddAccountUseCase throws', async () => {
    const { sut, addAccountUseCaseStub } = mockSut()
    jest.spyOn(addAccountUseCaseStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockAccountRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('deve retornar forbidden EmailInUseError se o email já foi cadastrado', async () => {
    const { sut, addAccountUseCaseStub } = mockSut()
    jest.spyOn(addAccountUseCaseStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockAccountRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
})
