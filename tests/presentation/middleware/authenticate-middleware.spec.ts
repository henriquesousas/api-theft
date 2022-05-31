import { AuthenticateMiddleware } from '../../../src/presentation/middlewares/authenticate-middleware'
import { forbidden } from '../../../src/presentation/helpers/http/http'
import { AccessDeniedError } from '../../../src/presentation/helpers/errors/access-denied-error'
import { LoadAccountByToken } from '../../../src/domain/usecases/middleware/load-account-by-token'
import { HttpRequest } from '../../../src/presentation/protocols/http-request'
import { mockAccountModel } from '../../data/models/mock-account'

describe('AuthenticateMiddleware', () => {
  test('Deve retornar 403 se não informado o x-access-token no header ', async () => {
    class LoadAccountByTokenUseCaseStub implements LoadAccountByToken {
      async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
        const account = mockAccountModel()
        return await new Promise(resolve => resolve({
          account
        }))
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenUseCaseStub()
    const sut = new AuthenticateMiddleware(loadAccountByTokenStub, 'admin')
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Deve chamar o LoadAccountByToken com o valor correto', async () => {
    class LoadAccountByTokenUseCaseStub implements LoadAccountByToken {
      async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
        const account = mockAccountModel()
        return await new Promise(resolve => resolve({
          account
        }))
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenUseCaseStub()
    const sut = new AuthenticateMiddleware(loadAccountByTokenStub, 'admin')
    const httpRequest: HttpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_token', 'admin')
  })
})
