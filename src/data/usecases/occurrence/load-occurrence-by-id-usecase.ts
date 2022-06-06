import { Occurrence } from '../../../domain/models/occurrence'
import { LoadOccurrenceById } from '../../../domain/usecases/occurrence/load-occurrence-by-id'
import { NotFoundError } from '../../../presentation/helpers/errors/not-found-error'
import { LoadOccurrenceByIdRepository } from '../../protocols/repository/ocurrence/load-occurrence-by-id-repository'

export class LoadOccurrenceByIdUseCase implements LoadOccurrenceById {
  constructor(private readonly repository: LoadOccurrenceByIdRepository) { }
  async loadById(id: string): Promise<Occurrence> {
    const occurrence = await this.repository.loadById(id)
    if (!occurrence) throw new NotFoundError()
    return occurrence
  }
}
