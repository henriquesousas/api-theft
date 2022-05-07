import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/cryptography/hasher'

export class BCrypterHasher implements Hasher {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string | null> {
    return await bcrypt.hash(value, this.salt)
  }
}
