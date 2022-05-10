import { BCrypter } from '../../../src/infra/criptography/bcrypter'

describe('Bcrypter', () => {
  test('deve criar a hashe do password com sucesso', async () => {
    const salt = 12
    const sut = new BCrypter(salt)
    const hashed = await sut.hash('any_password')
    expect(hashed).not.toBeNull()
    expect(hashed).toContain('$')
  })
})
