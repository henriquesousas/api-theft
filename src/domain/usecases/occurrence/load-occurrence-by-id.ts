import { Occurrence } from '@/domain/models/occurrence'

export interface LoadOccurrenceById {
  loadById(id: string): Promise<Occurrence>
}
