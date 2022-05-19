import { AccountMongoRepositoy } from '../../../src/infra/repository/account-mongo-repository'
import { mockAccountDto } from '../../domain/dto/mock-account-dto'
import { MongoHelper } from '../../../src/infra/repository/helper/mongo-helper'
import env from '../../../src/main/config/env'

// TODO: must create a test for loadByEmail()
describe('AddAccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('deve criar uma conta com sucesso', async () => {
    const sut = new AccountMongoRepositoy()
    const account = await sut.add(mockAccountDto())
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })
})
