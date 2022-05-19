import { AddOccurrenceRepositoy } from '../../data/protocols/repository/ocurrence/add-occurrence-repository'
import { OccurrenceDto } from '../../domain/dto/occurrence-dto'
import { MongoHelper } from './helper/mongo-helper'

export class OccurrenceMongoRepository implements AddOccurrenceRepositoy {
  async add(dto: OccurrenceDto): Promise<void> {
    const occurrenceCollection = await MongoHelper.getCollection('occurrences')
    await occurrenceCollection.insertOne(dto)
  }
}
