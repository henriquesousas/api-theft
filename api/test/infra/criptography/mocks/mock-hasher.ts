import { HashComparer } from '../../../../src/data/protocols/cryptography/hasher-comparer'

export const mockHasherComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async comparer(value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}
