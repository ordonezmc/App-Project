import { v4 as uuid } from "uuid";

import { LotsRepositoryImpl } from "../../infrastructure/repositories/lots.repository.impl";

export class CreateLotUseCase {
  private repository = new LotsRepositoryImpl();

  async execute(data: any, userId: string) {
    await this.repository.create({
      id: uuid(),
      usuario_id: userId,
      nombre: data.nombre,
      hectareas: data.hectareas,
      temperatura_min: data.temperatura_min,
      temperatura_max: data.temperatura_max,
      etapa_actual: data.etapa_actual,
      fecha_inicio: data.fecha_inicio,
      numero_plantas: data.numero_plantas,
    });
  }
}
