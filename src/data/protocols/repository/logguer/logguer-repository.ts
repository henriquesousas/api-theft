export interface LogguerRepository {
  log(message: string): Promise<void>
}
