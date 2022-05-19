import { OccurrenceDto } from '../../../../src/domain/dto/occurrence-dto'
import { AddOccurrence } from '../../../../src/domain/usecases/occurrence/add-occurrence'

export const mockAddOccurrence = (): AddOccurrence => {
  class AddOccurrenceStub implements AddOccurrence {
    async add(dto: OccurrenceDto): Promise<void> {
    }
  }
  return new AddOccurrenceStub()
}
