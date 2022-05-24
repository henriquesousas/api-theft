import { Occurrence } from '../../../domain/models/occurrence'
import { LoadOccurrenceById } from '../../../domain/usecases/occurrence/load-occurrence-by-id'
import { NotFoundError } from '../../../helpers/erros/not-found-error'
import { LoadOccurrenceByIdRepository } from '../../protocols/repository/ocurrence/load-occurrence-by-id-repository'

export class LoadOccurrenceByIdUseCase implements LoadOccurrenceById {
  constructor(private readonly loadOccurreceByIdRepository: LoadOccurrenceByIdRepository) { }
  async loadById(id: string): Promise<Occurrence> {
    const occurrence = await this.loadOccurreceByIdRepository.loadById(id)
    if (!occurrence) throw new NotFoundError()
    return occurrence
  }
}
