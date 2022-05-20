import { AddAccountRepositoy } from '../../data/protocols/repository/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../data/protocols/repository/account/load-account-by-email-repository'
import { LoadAccountByIdRepository } from '../../data/protocols/repository/account/load-account-by-id-repository'
import { AccountDto } from '../../domain/dto/account-dto'
import { Account } from '../../domain/models/account'
import { MongoHelper } from './helper/mongo-helper'

export class AccountMongoRepositoy implements AddAccountRepositoy, LoadAccountByEmailRepository, LoadAccountByIdRepository {
  async add(dto: AccountDto): Promise<Account> {
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
    const account = await accountCollection.findOne({ _id: id })
    return account && MongoHelper.map(account)
  }
}
