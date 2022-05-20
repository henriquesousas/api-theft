import { Express, Router } from 'express'
import accountRouter from '../routers/account-router'
import occurrenceRouter from '../routers/occurrences-router'

// TODO: Import all routers as dynamically
export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  accountRouter(router)
  occurrenceRouter(router)
  // const accountRouter = (await import('./routers/account-router')).default
  // importa todos os arquivos de de => src/main/routes/...
  // fg.sync('**/src/main/routes/**router.ts').map(async file => {
  //   const currentRoute = (await import(`../../../${file}`)).default
  //   currentRoute(router)
  //   // const router = (await import('../../../src/main/routes/signup-router')).default
  //   // router(router)
  // })
}
