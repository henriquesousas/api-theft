import bcrypt from 'bcrypt'
import { resolve } from 'path'
import { BCrypter } from '../../../src/infra/criptography/bcrypter'

let salt = 12

jest.mock('bcrypt', () => ({

  async hash(): Promise<string> {
    return await new Promise(resolve => resolve('mocked_hash'))
  },

  async compare(): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

const makeSut = (): BCrypter => {
  return new BCrypter(salt)
}

describe('Bcrypter', () => {
  describe('Hash()', () => {
    test('deve chamar a funcao hash do bcrypt com o valor correto', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_password')
      expect(hashSpy).toHaveBeenCalledWith('any_password', salt)
    })

    test('deve criar a hash com sucesso valor mocado', async () => {
      const sut = makeSut()
      const hashed = await sut.hash('any_password')
      expect(hashed).not.toBeNull()
      expect(hashed).toEqual('mocked_hash')
      // expect(hashed).toContain('$')
    })
  })

  describe('comparer()', () => {
    test('deve chamar a funcao compare do bcrypt com o valor correto', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.comparer('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('deve retornar false se o comparer falhar', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const isValid = await sut.comparer('any_value', 'any_hash')
      expect(isValid).toBe(false)
    })

    test('deve retornar true se o comparer for sucesso', async () => {
      const sut = makeSut()
      const isValid = await sut.comparer('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })
  })
})
