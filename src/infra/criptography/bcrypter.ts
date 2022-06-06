import bcrypt from 'bcrypt'
import { Hasher, HashComparer } from '@/data/protocols/cryptography'

export class BCrypter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string | null> {
    return await bcrypt.hash(value, this.salt)
  }

  async comparer (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
