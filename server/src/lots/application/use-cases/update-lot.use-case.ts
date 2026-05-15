import { LoteRepository } from '../../domain/repositories/lot.repository';
import { UpdateLoteDTO } from 'src/lots/infrastructure/dtos/update-lot.dto';

export class UpdateLoteUseCase {
  constructor(private loteRepo: LoteRepository) {}

  async execute(id: string, data: UpdateLoteDTO) {
    return this.loteRepo.update(id, data);
  }
}
