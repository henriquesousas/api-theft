import { Encrypter } from '../../../../src/data/protocols/cryptography/encrypter'
import { HashComparer } from '../../../../src/data/protocols/cryptography/hasher-comparer'

export const mockHasherComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async comparer(value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}


export const mockJwtAdapter = (): Encrypter => {
  class JwtAdapterStub implements Encrypter {
    encrypt(valeu: string): Promise<string> {
      return new Promise(resolve => resolve(''))
    }

  }
  return new JwtAdapterStub()
}
