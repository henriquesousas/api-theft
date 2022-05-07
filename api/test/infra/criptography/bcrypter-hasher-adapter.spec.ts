import { BCrypterHasher } from '../../../src/infra/criptography/bcrypter-hasher'

describe('BcrypterHasherAdapter', () => {
  test('deve criar a hashe do password com sucesso', async () => {
    const salt = 12
    const sut = new BCrypterHasher(salt)
    const hashed = await sut.hash('any_password')
    expect(hashed).not.toBeNull()
    expect(hashed).toContain('$')
  })
})
