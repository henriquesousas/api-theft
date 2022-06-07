import jwt from 'jsonwebtoken'
import { Decrypt, Encrypt } from '@/data/protocols/cryptography'

export class JwtAdapter implements Encrypt, Decrypt {
  constructor(private readonly secret: string) { }

  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }

  async decrypt(value: string): Promise<string> {
    const data = await jwt.verify(value, this.secret) as JwtPayloadType
    return data.id
  }
}

export type JwtPayloadType = {
  id: string
}
