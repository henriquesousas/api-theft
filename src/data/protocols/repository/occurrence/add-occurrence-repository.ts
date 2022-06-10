import { OccurrenceDto } from '@/domain/dto/occurrence-dto'

export interface AddOccurrenceRepository {
  add(dto: OccurrenceDto): Promise<number>
}
