import { OccurrenceDto } from '../../dto/occurrence-dto'

export interface AddOccurrence {
  add(dto: OccurrenceDto): Promise<void>
}
