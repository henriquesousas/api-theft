import { Occurrence } from '@/domain/models/occurrence'

export interface LoadOccurrenceByIdRepository {
  loadById(id: string): Promise<Occurrence>
}
