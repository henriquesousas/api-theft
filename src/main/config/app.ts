import Express from 'express'
import setupMiddlewares from './middleware'
import setupRouter from './router'
import setupSwagger from './config-swagger'

const app = Express()
setupSwagger(app)
setupMiddlewares(app)
setupRouter(app)
export default app
