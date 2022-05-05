import { InvalidParamError } from '../../src/helpers/erros/invalid-param-error'
import { EmailValidation } from '../../src/validators/email-validation'

describe('EmailValidation', () => {
  test('deve chamar EmailValidation com o valor correto', async () => {
    const sut = new EmailValidation()
    const emailValidationSpy = jest.spyOn(sut, 'validate')
    sut.validate({ email: 'any_email' })
    expect(emailValidationSpy).toHaveBeenCalledWith({ email: 'any_email' })
  })

  test('deve retornar InvalidParamError se email for invalido', async () => {
    const sut = new EmailValidation()
    const error = sut.validate({ email: 'any_email' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('deve retornar sucesso (null) se email for valido', async () => {
    const sut = new EmailValidation()
    const error = sut.validate({ email: 'any_email@gmail.com' })
    expect(error).toBeNull()
  })
})
