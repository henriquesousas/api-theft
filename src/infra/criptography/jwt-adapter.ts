import jwt from 'jsonwebtoken'
import { Decrypter } from '../../data/protocols/cryptography/decrypter'
import { Encrypter } from '../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) { }

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt(value: string): Promise<string> {
    const data = await jwt.verify(value, this.secret) as JwtPayloadType
    return data.id
  }
}

export type JwtPayloadType = {
  id: string
}
