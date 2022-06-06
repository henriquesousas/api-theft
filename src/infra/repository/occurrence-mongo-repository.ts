import { AddOccurrenceRepositoy } from '../../data/protocols/repository/ocurrence/add-occurrence-repository'
import { OccurrenceDto } from '../../domain/dto/occurrence-dto'
import { MongoHelper } from './helper/mongo-helper'
import { LoadOccurrenceByIdRepository } from '../../data/protocols/repository/ocurrence/load-occurrence-by-id-repository'
import { ObjectID } from 'mongodb'

export class OccurrenceMongoRepository implements AddOccurrenceRepositoy, LoadOccurrenceByIdRepository {
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
