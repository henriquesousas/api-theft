/***
 * Products
 * 1 => Carro
 * 2 => Moto
 * 3 => Celular
 * 4 => Caminhão
 * 5 => Bicicleta
 */

import { Address } from './address'

export interface Occurrence {
  id: string
  userId: string
  title: string
  description: string
  address: Address
  product: number
  dateOccurrence: Date
  createdAt: Date
}
