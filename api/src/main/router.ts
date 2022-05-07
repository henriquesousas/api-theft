import { Express, Router } from 'express'
import accountRouter from './routers/account-router'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  accountRouter(router)
  // const accountRouter = (await import('./routers/account-router')).default
  // importa todos os arquivos de de => src/main/routes/...
  // fg.sync('**/src/main/routes/**router.ts').map(async file => {
  //   const currentRoute = (await import(`../../../${file}`)).default
  //   currentRoute(router)
  //   // const router = (await import('../../../src/main/routes/signup-router')).default
  //   // router(router)
  // })
}
