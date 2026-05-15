import { LoteRepository } from '../../domain/repositories/lot.repository';

export class GetLotesUseCase {
  constructor(private loteRepo: LoteRepository) {}

  async execute(userId: string) {
    return this.loteRepo.findAllByUser(userId);
  }
}
