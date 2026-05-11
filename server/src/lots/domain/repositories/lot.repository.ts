import { Lot } from '../entities/lot.entity';

export abstract class LoteRepository {
  abstract create(lote: Lot): Promise<Lot>;
  abstract findAllByUser(userId: string): Promise<Lot[]>;
  abstract update(id: string, data: Partial<Lot>): Promise<Lot>;
}
