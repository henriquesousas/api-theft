import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/cryptography/hasher'
import { HashComparer } from '../../data/protocols/cryptography/hasher-comparer'

/** This class create and comparer Hasher using bcrypt dependency */
export class BCrypter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string | null> {
    return await bcrypt.hash(value, this.salt)
  }

  async comparer (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
