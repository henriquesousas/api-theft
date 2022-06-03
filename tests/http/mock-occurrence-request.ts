import { HttpRequest } from '@/presentation/protocols'
import { mockAddrress, mockOccurrence } from '../data/models/mock-occurrence'

export const mockAddOccurrenceRequest = (): HttpRequest => {
  return {
    body: {
      userId: 'any_userid',
      title: 'any_title',
      description: 'any_description',
      address: mockAddrress(),
      product: 1,
      dateOccurrence: new Date()
    }
  }
}

export const mockLoadOccurrenceByIdRequest = (): HttpRequest => {
  return {
    body: mockOccurrence()
  }
}
