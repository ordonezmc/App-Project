import { StageRecord } from '../entities/stage-record.entity';

export abstract class StageRecordRepository {

  abstract create(
    record: StageRecord
  ): Promise<StageRecord>;

  abstract findByLote(
    loteId: string
  ): Promise<StageRecord[]>;

  abstract update(
    id: string,
    data: Partial<StageRecord>
  ): Promise<StageRecord>;
}