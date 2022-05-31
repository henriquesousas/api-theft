import { AddAccountRepositoy } from '../../data/protocols/repository/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../data/protocols/repository/account/load-account-by-email-repository'
import { LoadAccountByIdRepository } from '../../data/protocols/repository/account/load-account-by-id-repository'
import { AccountDto } from '../../domain/dto/account-dto'
import { Account } from '../../domain/models/account'
import { MongoHelper } from './helper/mongo-helper'
import { UpdateAccessTokenRepository } from '../../data/protocols/repository/account/update-access-token-repository'
import { ObjectId } from 'mongodb'

export class AccountMongoRepositoy implements AddAccountRepositoy, LoadAccountByEmailRepository, LoadAccountByIdRepository, UpdateAccessTokenRepository {
  async create(dto: AccountDto): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(dto)
    const account = MongoHelper.map(result.ops[0])
    return account
  }

  async loadByEmail(email: string): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async loadById(id: string): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accounId = new ObjectId(id)
    const account = await accountCollection.findOne({ _id: accounId })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
