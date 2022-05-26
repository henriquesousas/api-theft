import env from '../../../src/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../../src/infra/repository/helper/mongo-helper'
import { OccurrenceMongoRepository } from '../../../src/infra/repository/occurrence-mongo-repository'
import { mockOccurrenceDto } from '../../domain/dto/mock-occurrence-dto'

let occurrenceCollection: Collection

describe('CreateOccurrenceRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    occurrenceCollection = MongoHelper.getCollection('occurrences')
    await occurrenceCollection.deleteMany({})
  })

  test('deve criar uma ocorrência com sucesso', async () => {
    const sut = new OccurrenceMongoRepository()
    await sut.add(mockOccurrenceDto())
    const count = await occurrenceCollection.countDocuments()
    expect(count).toBe(1)
  })
})
