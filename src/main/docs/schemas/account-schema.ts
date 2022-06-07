export const accountSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    },
    account: {
      $ref: '#/schemas/accountModel'
    }
    // account: {
    //   type: 'object',
    //   name: {
    //     type: 'string'
    //   },
    //   email: {
    //     type: 'string'
    //   },
    //   password: {
    //     type: 'string'
    //   },
    //   id: {
    //     type: 'string'
    //   }
    // }
  }
}
