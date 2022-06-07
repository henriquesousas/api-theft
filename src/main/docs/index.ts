import { authPath } from '@/main/docs/paths/auth-path'
import { accountSchema } from '@/main/docs/schemas/account-schema'
import { accountBodySchema } from '@/main/docs/schemas/account-body-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Sample API',
    description: 'Sample description',
    version: '0.0.1'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Authenticate'
  }],
  paths: {
    '/auth': authPath
  },
  schemas: {
    account: accountSchema,
    authBody: accountBodySchema
  }
}
