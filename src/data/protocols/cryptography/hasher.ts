/**
 * Hash => Operação irreversível (não tem como voltar atrás)
 * Encrypter => Operaçao reversível
 */
export interface Hasher {
  hash (value: string): Promise<string | null>
}
