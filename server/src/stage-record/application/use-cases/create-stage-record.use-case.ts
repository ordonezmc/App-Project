import { v4 as uuid } from 'uuid';
import { StageRecord } from '../../domain/entities/stage-record.entity';

export class CreateStageRecordUseCase {

  constructor(
    private repository: any
  ) {}

  async execute(data: any) {

    const record = new StageRecord(
      uuid(),
      data.lote_id,
      data.etapa_id,
      data.datos,
      data.fecha
    );

    return this.repository.create(record);
  }
}