import { EmailValidation } from '../../src/validators/email-validation'

describe('EmailValidation', () => {
  test('deve retornar false se email for invalido', async () => {
    const sut = new EmailValidation()
    const error = sut.isValid('any_email')
    expect(error).toEqual(false)
  })

  test('deve retornar sucesso true se email for valido', async () => {
    const sut = new EmailValidation()
    const error = sut.isValid('any_email@gmail.com')
    expect(error).toEqual(true)
  })
})
