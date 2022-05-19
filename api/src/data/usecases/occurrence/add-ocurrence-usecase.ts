import { OccurrenceDto } from '../../../domain/dto/occurrence-dto'
import { AddOccurrence } from '../../../domain/usecases/occurrence/add-occurrence'
import { AddOccurrenceRepositoy } from '../../protocols/repository/ocurrence/add-occurrence-repository'

export class AddOccurrenceUsecase implements AddOccurrence {
  constructor (private readonly addOccurrenceRepository: AddOccurrenceRepositoy) {}

  async add(dto: OccurrenceDto): Promise<void> {
    await this.addOccurrenceRepository.add(dto)
  }
}
