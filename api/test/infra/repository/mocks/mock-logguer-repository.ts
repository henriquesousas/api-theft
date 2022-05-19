import { LogguerRepository } from '../../../../src/data/protocols/repository/logguer-repository'

export const mockLogguerRepository = (): LogguerRepository => {
  class LogguerRepositoryStub implements LogguerRepository {
    async log(message: string): Promise<void> {
    }
  }
  return new LogguerRepositoryStub()
}
