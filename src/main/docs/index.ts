import { authPath } from '@/main/docs/paths'
import { errorResponseSchema, authDtoSchema, accountResponseSchema, accountModelSchema, accountCreateDtoSchema } from '@/main/docs/schemas'
import { badRequest, serverError, unauthorized } from '@/main/docs/components'
import { accountCreatePath } from '@/main/docs/paths/account-create-path'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Api para gerenciamento de roubo em sua cidade',
    description: 'Este serviço ajuda a indetificar e gerenciar no seu bairro os roubos ou assaltos que estão acontecendo de uma maneira fácil e rápida',
    contact: {
      email: 'paulohenriquess2014@gmail.com'
    },
    version: '0.0.1'
  },
  externalDocs: {
    description: 'Github do projeto',
    url: 'https://github.com/henriquesousas/api-theft'
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'Api relacionada a autenticação'
  }, {
    name: 'Cadastrar conta',
    description: 'Api relacionada a criação da conta de usuário'
  }],
  paths: {
    '/auth': authPath,
    '/account': accountCreatePath
  },
  schemas: {
    account: accountResponseSchema,
    authBody: authDtoSchema,
    error: errorResponseSchema,
    accountModel: accountModelSchema,
    accountCreateDto: accountCreateDtoSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized
  }
}
