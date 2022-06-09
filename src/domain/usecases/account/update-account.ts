import { UpdateAccountDto } from '@/domain/dto'

export interface UpdateAccount {
  update (accountDto: UpdateAccountDto): Promise<void>
}
