import { OccurrenceDto } from '../../../../src/domain/dto/occurrence-dto'
import { Occurrence } from '../../../../src/domain/models/occurrence'
import { AddOccurrence } from '../../../../src/domain/usecases/occurrence/add-occurrence'
import { LoadOccurrenceById } from '../../../../src/domain/usecases/occurrence/load-occurrence-by-id'
import { mockOccurrence } from '../../models/mock-occurrence'

export const mockAddOccurrence = (): AddOccurrence => {
  class AddOccurrenceStub implements AddOccurrence {
    async add(dto: OccurrenceDto): Promise<void> {
    }
  }
  return new AddOccurrenceStub()
}

export const mockLoadOccurrenceByIdUseCase = (): LoadOccurrenceById => {
  class LoadOccurrenceByIdUseCaseStub implements LoadOccurrenceById {
    async loadById(id: string): Promise<Occurrence> {
      return await new Promise(resolve => resolve(mockOccurrence()))
    }
  }
  return new LoadOccurrenceByIdUseCaseStub()
}
