import { UpdateAccountDto } from '@/domain/dto'

export interface UpdateAccountRepository {
  update (updateAccountDto: UpdateAccountDto): Promise<void>
}
