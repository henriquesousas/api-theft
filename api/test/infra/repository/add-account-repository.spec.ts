import { AccountDto } from '../../../src/domain/dto/account-dto'
import { AccountMongoRepositoy } from '../../../src/infra/repository/mongo/account-mongo-repository'
import { MongoHelper } from '../../../src/infra/repository/mongo/helper/mongo-helper'
import env from '../../../src/main/config/env'

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
    const accountDto: AccountDto = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const sut = new AccountMongoRepositoy()
    const account = await sut.add(accountDto)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })
})
