/**
 * Hash => Operação irreversível (não tem como voltar atrás)
 * Encrypter => Operaçao reversível
 */
export interface Hash {
  hash (value: string): Promise<string | null>
}
