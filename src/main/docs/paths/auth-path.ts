export const authPath = {
  post: {
    tag: ['Authenticate'],
    summary: 'Api para autenticar usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/authBody'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      },
      400: {
        description: 'Bad request'
      }
    }
  }
}
