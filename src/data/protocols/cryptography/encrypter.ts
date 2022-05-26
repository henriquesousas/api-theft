export interface Encrypter {
  encrypt(valeu: string): Promise<string>
}
