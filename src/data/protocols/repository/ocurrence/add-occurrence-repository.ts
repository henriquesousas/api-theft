import { OccurrenceDto } from '../../../../domain/dto/occurrence-dto'

export interface AddOccurrenceRepositoy {
  add(dto: OccurrenceDto): Promise<void>
}
