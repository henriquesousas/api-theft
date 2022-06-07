export const accountResponseSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    },
    account: {
      $ref: '#/schemas/accountModel'
    }
  }
}
