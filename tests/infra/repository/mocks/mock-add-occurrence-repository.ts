import { AddOccurrenceRepositoy } from '../../../../src/data/protocols/repository/ocurrence/add-occurrence-repository'
import { OccurrenceDto } from '../../../../src/domain/dto/occurrence-dto'

export const mockAddOccurrenceRepository = (): AddOccurrenceRepositoy => {
  class AddOccurrenceRepositoryStub implements AddOccurrenceRepositoy {
    async add(dto: OccurrenceDto): Promise<void> {

    }
  }
  return new AddOccurrenceRepositoryStub()
}
