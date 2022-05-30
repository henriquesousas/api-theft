import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/criptography/jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))

describe('JWT', () => {
  describe('sign', () => {
    test('Deve chamar o JWT com os valores correto', async () => {
      const sut = new JwtAdapter('secret')
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Deve retornar um accessToken se o JWT sign com sucesso', async () => {
      const sut = new JwtAdapter('secret')
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('Deve throws se o JWT sign throws', async () => {
      const sut = new JwtAdapter('secret')
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Decrypter', () => {

  })
})
