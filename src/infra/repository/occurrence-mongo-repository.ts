import { ObjectID } from 'mongodb'
import { MongoHelper } from './helper/mongo-helper'
import { OccurrenceDto } from '@/domain/dto/occurrence-dto'
import { AddOccurrenceRepository, LoadOccurrenceByIdRepository } from '@/data/protocols/repository/occurrence'

export class OccurrenceMongoRepository implements AddOccurrenceRepository, LoadOccurrenceByIdRepository {
  async add(dto: OccurrenceDto): Promise<number> {
    const occurrenceCollection = await MongoHelper.getCollection('occurrences')
    const data = await occurrenceCollection.insertOne(dto)
    const occurrenceId = data.ops[0]._id
    return occurrenceId
  }

  async loadById(id: any): Promise<any> {
    const occurrenceCollection = await MongoHelper.getCollection('occurrences')
    const occurrence = await occurrenceCollection.findOne({ _id: new ObjectID(id) })
    return occurrence && MongoHelper.map(occurrence)
  }
}
