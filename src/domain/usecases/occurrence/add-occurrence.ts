import { OccurrenceDto } from '@/domain/dto/occurrence-dto'

export interface AddOccurrence {
  add(dto: OccurrenceDto): Promise<number>
}
