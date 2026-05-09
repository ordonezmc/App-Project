import { v4 as uuid } from "uuid";
import { Lot } from "../../domain/entities/lot.entity";
import { LotsLocalRepository } from "../database/lots.local.repository";
import { db } from "../../../../core/database/sqlite";

export class LotsRepositoryImpl {
  private localRepo = new LotsLocalRepository();

  async create(data: Lot): Promise<void> {
    // guardar local
    await this.localRepo.create(data);

    // agregar a sync queue
    db.runSync(
      `
      INSERT INTO sync_queue (
        id,
        entidad,
        entidad_id,
        operacion,
        payload,
        estado,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        uuid(),
        "lote",
        data.id,
        "CREATE",
        JSON.stringify(data),
        "PENDING",
        new Date().toISOString(),
      ],
    );
  }

  async getAll(userId: string): Promise<Lot[]> {
    return this.localRepo.getAll(userId);
  }

  async update(id: string, data: Partial<Lot>): Promise<void> {
    await this.localRepo.update(id, data);

    db.runSync(
      `
      INSERT INTO sync_queue (
        id,
        entidad,
        entidad_id,
        operacion,
        payload,
        estado,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        uuid(),
        "lote",
        id,
        "UPDATE",
        JSON.stringify(data),
        "PENDING",
        new Date().toISOString(),
      ],
    );
  }
}
