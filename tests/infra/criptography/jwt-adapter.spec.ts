import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/criptography/jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  },

  async verify(): Promise<string> {
    return await new Promise(resolve => resolve('any_value'))
  }
}))

describe('JWTAdapter - Decrypter', () => {
  describe('sign()', () => {
    test('Deve chamar o sign com os valores correto', async () => {
      const sut = new JwtAdapter('secret')
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Deve retornar um accessToken se sign com sucesso', async () => {
      const sut = new JwtAdapter('secret')
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('Deve throws se o sign throws', async () => {
      const sut = new JwtAdapter('secret')
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Deve chamar verify com os valores corretos', async () => {
      const sut = new JwtAdapter('secret')
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('Deve retornar um valor se o verify descriptografar com sucesso', async () => {
      const sut = new JwtAdapter('secret')
      jest.spyOn(sut, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve('any_value')))
      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_value')
    })
  })
})
