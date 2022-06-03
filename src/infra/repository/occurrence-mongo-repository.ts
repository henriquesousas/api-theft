import { AddOccurrenceRepositoy } from '../../data/protocols/repository/ocurrence/add-occurrence-repository'
import { OccurrenceDto } from '../../domain/dto/occurrence-dto'
import { MongoHelper } from './helper/mongo-helper'
import { LoadOccurrenceByIdRepository } from '../../data/protocols/repository/ocurrence/load-occurrence-by-id-repository'
import { ObjectID } from 'mongodb'

export class OccurrenceMongoRepository implements AddOccurrenceRepositoy, LoadOccurrenceByIdRepository {
  async add(dto: OccurrenceDto): Promise<void> {
    const occurrenceCollection = await MongoHelper.getCollection('occurrences')
    await occurrenceCollection.insertOne(dto)
  }

  async loadById(id: any): Promise<any> {
    const occurrenceCollection = await MongoHelper.getCollection('occurrences')
    const occurrence = await occurrenceCollection.findOne({ _id: new ObjectID(id) })
    return occurrence && MongoHelper.map(occurrence)
  }
}
