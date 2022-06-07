import { Address } from '../models/address'

export interface OccurrenceDto {
  userId: string
  title: string
  description: string
  address: Address
  product: number
  dateOfOccurrence: Date
  createdAt: Date
  updateAt: Date
}
