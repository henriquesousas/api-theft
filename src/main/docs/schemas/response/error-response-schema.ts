export const errorResponseSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  }
}
