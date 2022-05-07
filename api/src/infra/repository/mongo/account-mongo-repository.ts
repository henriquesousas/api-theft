import { AddAccountRepositoy } from '../../../data/protocols/repository/add-account-repository'
import { AccountDto } from '../../../domain/dto/account-dto'
import { Account } from '../../../domain/models/account'
import { MongoHelper } from './helper/mongo-helper'

export class AccountMongoRepositoy implements AddAccountRepositoy {
  async add (dto: AccountDto): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(dto)
    const account = MongoHelper.map(result.ops[0])
    return account
  }
}
