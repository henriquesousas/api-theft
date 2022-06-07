export const accountCreatePath = {
  post: {
    tags: ['Cadastrar conta'],
    summary: 'Api para cadastro de uma conta',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/accountCreateDto'
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
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
