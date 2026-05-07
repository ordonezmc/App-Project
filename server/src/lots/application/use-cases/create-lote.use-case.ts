import { LoteRepository } from '../../domain/repositories/lot.repository';
import { Lot } from '../../domain/entities/lot.entity';
import { v4 as uuid } from 'uuid';
import {CreateLoteDTO} from '../../infrastructure/dtos/create-lote.dto';

export class CreateLoteUseCase {
  constructor(private loteRepo: LoteRepository) {}

  async execute(data: CreateLoteDTO, userId: string) {
    const lote = new Lot(
      uuid(),
      userId,
      data.nombre,
      data.hectareas,
      data.temperatura_min,
      data.temperatura_max,
      data.etapa_actual_id,
      new Date(data.fecha_inicio),
      data.numero_plantas,
    );

    return this.loteRepo.create(lote);
  }
}
