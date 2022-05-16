import { LogguerRepository } from '../../data/protocols/repository/logguer-repository'
import { MongoHelper } from './helper/mongo-helper'

export class LogguerMongoRepository implements LogguerRepository {
  async log(message: string): Promise<void> {
    const logguerCollection = await MongoHelper.getCollection('logguer')
    const result = await logguerCollection.insertOne(
      {
        message,
        createdAt: new Date()
      })
    return MongoHelper.map(result.ops[0])
  }
}
