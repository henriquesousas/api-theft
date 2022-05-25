import { Address } from '../../../src/domain/models/address'
import { Occurrence } from '../../../src/domain/models/occurrence'

export const mockOccurrence = (): Occurrence => {
  return {
    id: 'any_id',
    userId: 'any_userid',
    title: 'any_title',
    description: 'any_description',
    address: mockAddrress(),
    product: 1,
    dateOccurrence: new Date(),
    createdAt: new Date()
  }
}

export const mockAddrress = (): Address => {
  return {
    neighborhood: 'any_neighborhood',
    city: 'any_city',
    state: 'any_state',
    zipCode: 'any_zipcode'
  }
}
