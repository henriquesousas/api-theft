import { OccurrenceDto } from '../../../src/domain/dto/occurrence-dto'

export const mockOccurrenceDto = (): OccurrenceDto => {
  const address = {
    neighborhood: 'any_neighborhood',
    city: 'any_city',
    state: 'any_state',
    zipCode: 'any_zipcode'
  }
  return {
    userId: 'any_id',
    title: 'any_title',
    description: 'any_description',
    address: address,
    product: 1,
    dateOccurrence: new Date()
  }
}
