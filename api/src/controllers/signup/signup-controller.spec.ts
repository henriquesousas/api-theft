import { MissingParamError } from '../../helpers/erros/missing-param-error'
import { SignupController } from './signup-controller'

describe('SignupController', () => {
  test('deve retornar 400 se name não informado', async () => {
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }
    const sut = new SignupController()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.body).toEqual(new MissingParamError('name'))
  })

  test('deve retornar 400 se email não informado', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const sut = new SignupController()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.body).toEqual(new MissingParamError('email'))
  })

  test('deve retornar 400 se password não informado', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email'
      }
    }
    const sut = new SignupController()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.body).toEqual(new MissingParamError('password'))
  })  
})
