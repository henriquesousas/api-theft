import { authPath } from '@/main/docs/paths'
import { errorSchema, accountBodySchema, accountSchema } from '@/main/docs/schemas'
import { badRequest, serverError, unauthorized } from '@/main/docs/components'

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
    name: 'Authenticate',
    description: 'Api relacionada a autenticação'
  }],
  paths: {
    '/auth': authPath
  },
  schemas: {
    account: accountSchema,
    authBody: accountBodySchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized
  }
}
