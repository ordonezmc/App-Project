import { db } from "../../../../core/database/sqlite";
import { Lot } from "../../domain/entities/lot.entity";

export class LotsLocalRepository {
  async create(data: Lot): Promise<void> {
    db.runSync(
      `
      INSERT INTO lote   (
        id,
        usuario_id,
        nombre,
        hectareas,
        temperatura_min,
        temperatura_max,
        etapa_actual,
        fecha_inicio,
        numero_plantas,
        synced,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.id,
        data.usuario_id,
        data.nombre,
        data.hectareas,
        data.temperatura_min,
        data.temperatura_max,
        data.etapa_actual,
        data.fecha_inicio,
        data.numero_plantas,
        0,
        new Date().toISOString(),
      ],
    );
  }

  async getAll(userId: string): Promise<Lot[]> {
    const result = db.getAllSync(
      `
      SELECT * FROM lote
      WHERE usuario_id = ?
      ORDER BY created_at DESC
      `,
      [userId],
    );

    return result as Lot[];
  }

  async update(id: string, data: Partial<Lot>): Promise<void> {
    const currentLot = db.getFirstSync(`SELECT * FROM lots WHERE id = ?`, [
      id,
    ]) as Lot;

    db.runSync(
      `
    UPDATE lots
    SET nombre = ?,
        hectareas = ?,
        temperatura_min = ?,
        temperatura_max = ?,
        numero_plantas = ?,
        synced = 0
    WHERE id = ?
    `,
      [
        data.nombre ?? currentLot.nombre,
        data.hectareas ?? currentLot.hectareas,
        data.temperatura_min ?? currentLot.temperatura_min,
        data.temperatura_max ?? currentLot.temperatura_max,
        data.numero_plantas ?? currentLot.numero_plantas,
        id,
      ],
    );
  }
}
