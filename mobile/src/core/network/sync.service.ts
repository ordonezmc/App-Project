import { db } from "../database/sqlite";
import api from "./api";

export async function syncPendingData() {
  try {
    const pendingItems = db.getAllSync(`
      SELECT * FROM sync_queue
      WHERE estado = 'PENDING'
    `);

    for (const item of pendingItems as any[]) {
      const payload = JSON.parse(item.payload);

      if (item.entidad === "lote") {
        if (item.operacion === "CREATE") {
          await api.post("/lotes", payload);
        }

        if (item.operacion === "UPDATE") {
          await api.patch(`/lotes/${item.entidad_id}`, payload);
        }
      }

      db.runSync(
        `
        UPDATE sync_queue
        SET estado = 'SYNCED'
        WHERE id = ?
        `,
        [item.id],
      );
    }

    console.log("Sincronizacion completeda");
  } catch (error) {
    console.error("Error de sincronizacion:", error);
  }
}
