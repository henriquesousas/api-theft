import { OccurrenceDto } from '@/domain/dto'
import { AddOccurrence } from '@/domain/usecases/occurrence'
import { UnauthorizedError } from '@/presentation/helpers/errors'
import { LoadAccountByIdRepository } from '@/data/protocols/repository/account/load-account-by-id-repository'
import { AddOccurrenceRepositoy } from '@/data/protocols/repository/ocurrence/add-occurrence-repository'

export class AddOccurrenceUseCase implements AddOccurrence {
  constructor(
    private readonly addOccurrenceRepository: AddOccurrenceRepositoy,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository) { }

  async add(dto: OccurrenceDto): Promise<number> {
    const account = await this.loadAccountByIdRepository.loadById(dto.userId)
    if (!account) throw new UnauthorizedError()
    return await this.addOccurrenceRepository.add(dto)
  }
}
