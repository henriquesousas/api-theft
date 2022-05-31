import { AccountMongoRepositoy } from '../../../src/infra/repository/account-mongo-repository'
import { mockAccountDto } from '../../domain/dto/mock-account-dto'
import { MongoHelper } from '../../../src/infra/repository/helper/mongo-helper'
import env from '../../../src/main/config/env'
import { Collection } from 'mongodb'
import { mockAccountModel } from '../../domain/models/account'

let accountCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('create', () => {
    test('deve criar uma conta com sucesso', async () => {
      const sut = new AccountMongoRepositoy()
      const account = await sut.create(mockAccountDto())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail', () => {
    test('deve retornar uma conta com sucesso', async () => {
      const accountFake = mockAccountModel()
      accountCollection.insertOne(accountFake)
      const sut = new AccountMongoRepositoy()
      const account = await sut.loadByEmail(accountFake.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email')
      expect(account.password).toBe('any_password')
    })

    test('deve retornar null se loadByEmail não encontrar uma conta', async () => {
      const sut = new AccountMongoRepositoy()
      const account = await sut.loadByEmail('any_email')
      expect(account).toBeNull()
    })
  })

  describe('loadById', () => {
    test('deve retornar uma conta com sucesso', async () => {
      const accountFake = mockAccountModel()
      const result = await accountCollection.insertOne(accountFake)
      const sut = new AccountMongoRepositoy()
      const account = await sut.loadById(result.ops[0]._id)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email')
      expect(account.password).toBe('any_password')
    })
  })

  describe('updateAccessToken', () => {
    test('deve retornar uma conta com sucesso', async () => {
      const accountFake = mockAccountModel()
      const result = await accountCollection.insertOne(accountFake)
      const sut = new AccountMongoRepositoy()
      await sut.updateAccessToken(result.ops[0]._id, 'any_token')

      const account = await sut.loadByEmail(accountFake.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email')
      expect(account.password).toBe('any_password')
    })
  })
})
