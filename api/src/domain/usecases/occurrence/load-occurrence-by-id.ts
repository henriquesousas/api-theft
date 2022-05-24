import { Occurrence } from '../../models/occurrence'

export interface LoadOccurrenceById {
  loadById(id: string): Promise<Occurrence>
}
