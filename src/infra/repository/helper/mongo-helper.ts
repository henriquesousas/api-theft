import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: String,

  async connect(uri: string) {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect() {
    this.client.close()
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },

  /** Função que remove o _id do mongodb e troca por id */
  map: (collection: any): any => {
    const { _id, ...collectionWithoutMongoId } = collection
    return Object.assign({}, collectionWithoutMongoId, { id: _id })
  }
}
