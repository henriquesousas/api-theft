import { HttpRequest } from '../../src/controllers/import-protocols'

export const mockFakeRequest = (): HttpRequest => {
  const httpRequest = {
    body: {
      name: 'any_nam',
      email: 'any_email',
      password: 'any_password'
    }
  }
  return httpRequest
}

export const mockFakeRequestWithoutName = (): HttpRequest => {
  return {
    body: {
      email: 'any_email',
      password: 'any_password'
    }
  }
}
