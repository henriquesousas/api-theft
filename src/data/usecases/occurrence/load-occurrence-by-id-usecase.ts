import { Occurrence } from '@/domain/models/occurrence'
import { LoadOccurrenceById } from '@/domain/usecases/occurrence'
import { NotFoundError } from '@/presentation/helpers/errors'
import { LoadOccurrenceByIdRepository } from '@/data/protocols/repository/occurrence/load-occurrence-by-id-repository'

export class LoadOccurrenceByIdUseCase implements LoadOccurrenceById {
  constructor(private readonly repository: LoadOccurrenceByIdRepository) { }
  async loadById(id: string): Promise<Occurrence> {
    const occurrence = await this.repository.loadById(id)
    if (!occurrence) throw new NotFoundError()
    return occurrence
  }
}
