import { db } from "./sqlite";
import { CREATE_LOTS_TABLE } from "./tables/lots.table";
import { CREATE_SYNC_QUEUE_TABLE } from "./tables/sync-queue.table";

export async function runMigrations() {
  try {
    db.execSync(CREATE_LOTS_TABLE);

    db.execSync(CREATE_SYNC_QUEUE_TABLE);

    console.log("Daatabase migrada correctamente");
  } catch (error) {
    console.error("Error de migracion:", error);
  }
}
