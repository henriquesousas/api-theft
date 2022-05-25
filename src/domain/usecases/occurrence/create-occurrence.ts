import { OccurrenceDto } from '../../dto/occurrence-dto'

export interface CreateOccurrence {
  add(dto: OccurrenceDto): Promise<void>
}
