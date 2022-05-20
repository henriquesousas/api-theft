import { OccurrenceDto } from '../../../domain/dto/occurrence-dto'
import { AddOccurrence } from '../../../domain/usecases/occurrence/add-occurrence'
import { UnauthorizedError } from '../../../helpers/erros/unauthorized-error'
import { LoadAccountByIdRepository } from '../../protocols/repository/account/load-account-by-id-repository'
import { AddOccurrenceRepositoy } from '../../protocols/repository/ocurrence/add-occurrence-repository'

export class AddOccurrenceUsecase implements AddOccurrence {
  constructor(
    private readonly addOccurrenceRepository: AddOccurrenceRepositoy,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository) { }

  async add(dto: OccurrenceDto): Promise<void> {
    const account = await this.loadAccountByIdRepository.loadById(dto.userId)
    if (!account) throw new UnauthorizedError()
    await this.addOccurrenceRepository.add(dto)
  }
}
