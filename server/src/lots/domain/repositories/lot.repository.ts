import { Lot } from '../entities/lot.entity';

export abstract class LoteRepository {
  abstract create(lote: Lot): Promise<Lot>;
  abstract findAllByUser(userId: string): Promise<Lot[]>;
  abstract findById(id: string): Promise<Lot | null>;
  abstract update(id: string, data: Partial<Lot>): Promise<Lot>;
  abstract delete(id:string): Promise<void>;

}
