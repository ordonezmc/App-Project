import { Lot } from '../entities/lot.entity';

export interface LotRepository {

  create(data: Lot): Promise<void>;

  getAll(userId: string): Promise<Lot[]>;

  update(id: string, data: Partial<Lot>): Promise<void>;

}