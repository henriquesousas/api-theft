import { UpdateAccount } from '@/domain/usecases/account'
import { UpdateAccountRepository } from '@/data/protocols/repository/account/update-account-repository'
import { UpdateAccountDto } from '@/domain/dto/update-account-dto'

export class UpdateAccountUseCase implements UpdateAccount {
  constructor (private readonly updateAccountRepository: UpdateAccountRepository) {
  }

  async update (updateDto: UpdateAccountDto): Promise<void> {
    await this.updateAccountRepository.update(updateDto)
  }
}
