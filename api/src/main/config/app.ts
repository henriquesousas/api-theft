import Express from 'express'
import setupMiddlewares from './middleware'
import setupRouter from './router'

const app = Express()
setupMiddlewares(app)
setupRouter(app)
export default app
