import { HttpRequest } from '../../src/controllers/import-protocols'

export const mockAddOccurrenceRequest = (): HttpRequest => {
  const address = {
    neighborhood: 'string',
    city: 'string',
    state: 'string',
    zipCode: '06263100'
  }
  return {
    body: {
      userId: 'any_userid',
      title: 'any_title',
      description: 'any_description',
      address: address,
      product: 1,
      dateOccurrence: new Date()
    }
  }
}
