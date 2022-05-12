import { MongoHelper } from '../infra/repository/helper/mongo-helper'
import env from './config/env'

MongoHelper.connect('mongodb://localhost:27017/theft')
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`)
    })
  })
  .catch(console.error)
