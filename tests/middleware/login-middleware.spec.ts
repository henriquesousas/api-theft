import { LoginMiddleware } from '../../src/middlewares/login-middleware'
import { forbidden } from  '../../src/helpers/http/http'
import { AccessDeniedError } from  '../../src/helpers/erros/access-denied-error'

describe('LoginMiddleware', () => {
  test('Deve retornar 403 se não informado o x-access-token no header ', async () => {
    const sut = new LoginMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})