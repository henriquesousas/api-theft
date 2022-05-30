import { LoginMiddleware } from '../../src/middlewares/login-middleware'
import { forbidden } from '../../src/helpers/http/http'
import { AccessDeniedError } from '../../src/helpers/erros/access-denied-error'
import { LoadAccountByToken } from '../domain/usecases/middleware/load-account-by-token'
import { HttpRequest } from '../helpers/http/http-request'

describe('LoginMiddleware', () => {
  test('Deve retornar 403 se não informado o x-access-token no header ', async () => {
    class LoadAccountByTokenUseCaseStub implements LoadAccountByToken {
      async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
        return await new Promise(resolve => resolve({
          id: 'any_id'
        }))
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenUseCaseStub()
    const sut = new LoginMiddleware(loadAccountByTokenStub, 'admin')
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Deve chamar o LoadAccountByToken com o valor correto', async () => {
    class LoadAccountByTokenUseCaseStub implements LoadAccountByToken {
      async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
        return await new Promise(resolve => resolve({
          id: 'any_id'
        }))
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenUseCaseStub()
    const sut = new LoginMiddleware(loadAccountByTokenStub, 'admin')
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
