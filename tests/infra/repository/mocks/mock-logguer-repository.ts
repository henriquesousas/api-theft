import { LogRepository } from '@/data/protocols/repository/logguer/log-repository'

export const mockLogguerRepository = (): LogRepository => {
  class LogguerRepositoryStub implements LogRepository {
    async log(message: string): Promise<void> {
    }
  }
  return new LogguerRepositoryStub()
}
