import { ObjectId } from 'mongodb'
import { MongoHelper } from '../../../src/infra/repository/helper/mongo-helper'
import { AccountDto } from '@/domain/dto/account-dto'
import { Account } from '@/domain/models/account'
import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByIdRepository,
  UpdateAccessTokenRepository
} from '@/data/protocols/repository/account/'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByIdRepository, UpdateAccessTokenRepository {
  private readonly collection = 'accounts'
  async create(dto: AccountDto): Promise<Account> {
    const accountCollection = MongoHelper.getCollection(this.collection)
    const result = await accountCollection.insertOne(dto)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail(email: string): Promise<Account> {
    const accountCollection = MongoHelper.getCollection(this.collection)
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async loadById(id: string): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection(this.collection)
    const accountId = new ObjectId(id)
    const account = await accountCollection.findOne({ _id: accountId })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection(this.collection)
    accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
